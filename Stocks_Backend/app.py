from flask import Flask, request, jsonify
from flask_cors import CORS
import yfinance as yf
from alpaca_trade_api import REST
from timedelta import Timedelta
import datetime 
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from dateutil import parser
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import timedelta
import psycopg2
import os
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "https://fanciful-tarsier-0474d7.netlify.app"}})
CORS(app)
model = load_model('prediction_model.h5')
DATABASE_URL = os.getenv('DATABASE_URL')



class SentimentAnalyzer:
    def __init__(self):
        self.tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
        self.model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
        self.labels = ["Positive", "Negative", "Neutral"]
        self.api = REST(base_url=os.getenv('API_URL'), key_id=os.getenv('API_KEY'),secret_key=os.getenv('SECRET_KEY'))

    def estimate_sentiment(self, news):
        if news:
            inputs = self.tokenizer(news, return_tensors="pt", padding=True)
            result = self.model(inputs["input_ids"], attention_mask=inputs["attention_mask"])["logits"]
            result = torch.nn.functional.softmax(torch.sum(result, 0), dim=-1)
            probability = result[torch.argmax(result)]
            sentiment = self.labels[torch.argmax(result)]
            return probability.item(), sentiment
        else:
            return 0.0, self.labels[-1]

    def get_dates(self):
        today = datetime.date.today()
        prev = today - Timedelta(days=7)
        prevMonth = today - Timedelta(days=30)
        return today.strftime('%Y-%m-%d'), prev.strftime('%Y-%m-%d'), prevMonth.strftime('%Y-%m-%d')
    

    def get_sentiment(self,stockSymbol):
        today, prev, prevMonth = self.get_dates()
        news = self.api.get_news(symbol=stockSymbol,start = prev, end = today, limit = 10)
        newsList = [page.__dict__["_raw"]["headline"] for page in news]
        tensor, sentiment = self.estimate_sentiment(newsList)

        return tensor,sentiment



analyzer = SentimentAnalyzer()


app.config['SECRET_KEY'] = os.getenv('MAIN_SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config["MONGO_URI"] = os.getenv('USER_DATABASE_URL')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=2)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
mongo = PyMongo(app)

with app.app_context():
    mongo.db.User_data.create_index('email', unique=True)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email') 
    password = data.get('password')


    if not name or not password or not email:
        return jsonify({'message': 'Missing name, email, or password'}), 400

    existing_user = mongo.db.User_data.find_one({'$or': [{'email': email}]})
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = {
        'name': name,
        'email': email,
        'password': hashed_password,
        'data': []
    }

    mongo.db.User_data.insert_one(new_user)
    return jsonify({'message': 'User created, please login'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('email')
    password = data.get('password')

    user = mongo.db.User_data.find_one({'email': username})


    if user and bcrypt.check_password_hash(user['password'], password):
            access_token = create_access_token(identity=str(user['_id']))
            refresh_token = create_refresh_token(identity=str(user['_id']))
            return jsonify({'message': 'Login Success', 'access_token': access_token, 'refresh_token': refresh_token, 'user_name':user['name'], 'user_data' : user['data'] })
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=user_id)
    return jsonify({'access_token': new_access_token})




@app.route('/get-user-data', methods=['GET'])
@jwt_required()
def get_user_data():
    jwt_data = get_jwt()
    user_id = jwt_data['sub']
    user = mongo.db.User_data.find_one({'_id': ObjectId(user_id)})
    if user:
        return jsonify({'valid': True, 'user_name':user['name'], 'user_data' : user['data'] })
    else:
        return jsonify({'valid': False}), 401
    


@app.route('/add-user-stock')  
@jwt_required()
def add_user_stock():
    jwt_data = get_jwt()
    user_id = jwt_data['sub']
    user = mongo.db.User_data.find_one({'_id': ObjectId(user_id)})
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Symbol parameter is required"}), 400    

    if user:

        if symbol not in user['data']:
            mongo.db.User_data.update_one(
                {'_id': ObjectId(user_id)},
                {'$push': {'data': symbol}}
            )
            reply = "Stock symbol added successfully"
        else:
            reply = "Stock symbol already exists"

    
    if user:
        return jsonify({'valid': True,  'message' : reply})
    else:
        reply = "User not found"
        return jsonify({'valid': False, 'message' : reply}), 401
    


@app.route('/remove-user-stock')
@jwt_required()
def remove_user_stock():
    jwt_data = get_jwt()
    user_id = jwt_data['sub']
    user = mongo.db.User_data.find_one({'_id': ObjectId(user_id)})
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Symbol parameter is required"}), 400    

    if user:

        if symbol in user['data']:
            mongo.db.User_data.update_one(
                {'_id': ObjectId(user_id)},
                {'$pull': {'data': symbol}}
            )
            reply = "Stock symbol added successfully"
        else:
            reply = "Stock symbol already exists"

    
    if user:
        return jsonify({'valid': True,  'message' : reply})
    else:
        reply = "User not found"
        return jsonify({'valid': False, 'message' : reply}), 401
    


    
    
@app.route('/verify-token', methods=['GET'])
@jwt_required()
def verify_token():
    jwt_data = get_jwt()
    user_id = jwt_data['sub']
    user = mongo.db.User_data.find_one({'_id': ObjectId(user_id)})
    if user:
        return jsonify({'valid': True})
    else:
        return jsonify({'valid': False}), 401


@app.route('/verify-refresh-token', methods=['POST'])
@jwt_required(refresh=True)
def verify_refresh_token():
    user_id = get_jwt_identity()
    user = mongo.db.User_data.find_one({'_id': ObjectId(user_id)})
    if user:
        return jsonify({'valid': True})
    else:
        return jsonify({'valid': False}), 401


@app.route('/fetch_historical_data', methods=['GET'])
def fetch_historical_data():
    symbol = request.args.get('symbol')
    period = request.args.get('period', '1mo')  # Default to 1 month
    interval = request.args.get('interval', '1d')  # Default to 1 day
    
    if not symbol:
        return jsonify({"error": "Symbol parameter is required"}), 400
    
    ticker = yf.Ticker(symbol)
    hist = ticker.history(period=period, interval=interval)
    data = hist.reset_index().to_dict('records')
    return jsonify(data)




@app.route('/sentiment', methods=['GET'])
def analyze_sentiment():
    stock_symbol = request.args.get('stock_symbol')

    tensor, sentiment = analyzer.get_sentiment(stock_symbol)
    ticker = yf.Ticker(stock_symbol)
    hist = ticker.history(period='1y', interval='1d')
    trend = ""

    if len(hist) >= 200:
        avg_200 = hist['Close'].tail(140).mean()
    
        avg_100 = hist['Close'].tail(70).mean()

        if(avg_200 > avg_100):
            trend = "Down Trend"
        else:
            trend = "Up Trend"

    print(tensor)

    return jsonify({
        'stock_symbol': stock_symbol,
        'sentiment': sentiment,
        'confidence': float(tensor),
        'trend': trend
    })




@app.route('/predict', methods=['GET'])
def predict_stock():
    symbol = request.args.get('symbol', default='', type=str)
    
    if not symbol:
        return jsonify({'error': 'Symbol parameter is required'}), 400
    
    period = '1y'
    interval = '1d'
    history = 100
    
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period=period, interval=interval)
        data = hist.reset_index().to_dict('records')
        df = pd.DataFrame(data)

        og_values = df.filter(['Close']).values
        og_dates = df['Date']
        og_dates = [parser.parse(str(i)) for i in og_dates]
        dates = og_dates.copy()
        
        # Prepare data for prediction
        dataset = df.filter(['Close']).values
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(dataset)
        
        # Prepare test data
        test_data = scaled_data[:, :]
        x_test = []
        y_test = dataset[history:, ]
        
        for i in range(history, len(test_data)):
            x_test.append(test_data[i-history:i, 0])
        
        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
        
        # Make predictions
        predictions = model.predict(x_test)
        
        # Prepare future predictions
        x_test_curr = test_data[-history:]
        x_test_curr = np.reshape(x_test_curr, (1, x_test_curr.shape[0], 1))
        
        future_predictions = []
        for i in range(15):
            dates.append(dates[-1] + Timedelta(days=1))
            prediction = model.predict(x_test_curr)
            future_predictions.append(prediction[0])
            x_test_curr = np.append(x_test_curr[:, 1:, :], prediction.reshape(1, 1, 1), axis=1)
        
        predictions = np.concatenate([predictions, np.array(future_predictions)])
        predictions = scaler.inverse_transform(predictions)
        
        # Flatten arrays for JSON serialization
        og_values = og_values.reshape(-1).tolist()
        predictions = predictions.reshape(-1).tolist()
        dates = [date.strftime('%Y-%m-%d') for date in dates]
        dates = dates[100:]
        og_dates = [date.strftime('%Y-%m-%d') for date in og_dates]
        
        return jsonify({
            'symbol': symbol,
            'original_values': og_values,
            'predictions': predictions,
            'dates': dates,
            'original_dates': og_dates
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    



@app.route('/stock-data', methods=['GET'])
def get_stock_data():
    symbols = request.args.get('symbols', '')
    if not symbols:
        return jsonify({'error': 'Symbols parameter is required and should be comma-separated'}), 400
    
    symbols = ('Z,'+symbols.strip().rstrip(',')).split(',')
    
    period = '1d'
    interval = '1d'
    
    try:
        ticker = yf.Tickers(' '.join(symbols))
        hist = ticker.history(period=period, interval=interval)
        
        parts = ['Close', 'Open', 'High', 'Low']
        
        price_dict = {symbol: {part: hist[part][symbol].values[-1].round(5) for part in parts} for symbol in symbols[1:]}
        
        return jsonify(price_dict)
    
    except Exception as e:
        return jsonify({'error': f'Error fetching stock data: {str(e)}'}), 500
    





@app.route('/search_stocks', methods=['GET'])
def search_stocks():
    ip = request.args.get('q', '').strip()
    print(ip)
    if(ip == ""):
        return jsonify(())


    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()

        cur.execute(f"SELECT * FROM stock WHERE (LOWER(symbol) LIKE LOWER('%{ip}%') OR LOWER(company) LIKE LOWER('%{ip}%')) AND exchange='NASDAQ' LIMIT 20")

        rows = cur.fetchall()


        symbols = [[row[1]," ".join(row[2].split()[:3])] for row in rows]

        cur.close()
        conn.close()

        return jsonify(symbols)

    except (Exception, psycopg2.Error) as error:
        print(error)
        return jsonify({'error': f'Error fetching stock symbols: {error}'}), 500



if __name__ == '__main__':
    app.run( port = 8000)