# Stellar Desk

[**Stellar Desk**](http://stellardesk.org) is an [open source](https://github.com/etale-cohomology/stellardesk) tool to interact with the Stellar network with a simple interface.
You can use it as an [account viewer](http://stellardesk.org/accounts.html), [wallet](http://stellardesk.org/wallet.html), [network explorer](http://stellardesk.org/ledgers.html), or [markets monitor](http://stellardesk.org/markets.html).
All data is visualized in real time.


## View accounts

Watch transactions, operations, effects, payments, and offers for any account, in real time.

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/00.png)
![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/01.png)
![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/02.png)


## Explore the network

### Ledgers

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/03.png)

### Deepdive for a single ledger

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/04.png)

### Transactions

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/05.png)

### Operations

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/06.png)

### Effects

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/07.png)

### Payments

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/08.png)


## Monitor the Lumen (centralized) markets

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/09.png)
![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/0a.png)


## Use as a wallet

### Generate accounts

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/0b.png)

### Send lumens

![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/0c.png)
![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/0d.png)
![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/0e.png)
![](https://github.com/etale-cohomology/stellardesk/blob/gh-pages/screenshots/0f.png)

The secret seed is never stored.


### Run locally

To run the app locally, you need [Python](https://www.python.org/) and [Flask](http://flask.pocoo.org/).

After Python is installed, you can install Flask with

    pip install flask

Then, you can start the app with

    export FLASK_APP=local_server.py
    flask run

which should serve the app on `localhost:5000`
