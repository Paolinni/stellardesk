# This Python script is used to run a local HTTP server, for local development
# To serve the app locally, run:
#   export FLASK_APP=local_server.py
#   flask run


from flask import Flask
app = Flask(__name__, static_url_path='', static_folder='')

@app.route('/')
def index():
  return app.send_static_file('index.html')

@app.route('/accounts')
def accounts():
  return app.send_static_file('accounts.html')

@app.route('/ledgers')
def ledgers():
  return app.send_static_file('ledgers.html')

@app.route('/transactions')
def transactions():
  return app.send_static_file('transactions.html')

@app.route('/operations')
def operations():
  return app.send_static_file('operations.html')

@app.route('/effects')
def effects():
  return app.send_static_file('effects.html')

@app.route('/payments')
def payments():
  return app.send_static_file('payments.html')

@app.route('/markets')
def markets():
  return app.send_static_file('markets.html')

@app.route('/wallet')
def wallet():
  return app.send_static_file('wallet.html')
