// ------------------------------------------------------------------------------------------------
let doc = document
let print = console.log

function type(x){
  return typeof(x)
}

function error_show(error){
  print('ERROR!', error)
  return null
}

function undefined2na(object){
  return typeof(object) === 'undefined' ? 'NA' : object
}

function undefined_to_NA(object){
  return typeof(object) === 'undefined' ? 'NA' : object
}

// ----------------------------------------------------------------------
const average = (array) => array.reduce((a, b) => a + b) / array.length;

// ----------------------------------------------------------------------
// Random utilities!

function rand(min=0, max=1){
  return Math.random() * (max - min) + min;
}

function rand_int(min=0, max=1){
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function rand_str(nchars){
  let str = ''
  let ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for(let i = 0; i < nchars; ++i)
    str += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
  return str
}

// ----------------------------------------------------------------------
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function pad_zero2(number){
  return number.toLocaleString('en', {minimumIntegerDigits:2})
}

function date_format(date){
  return `${date.getFullYear()} ${MONTHS[date.getMonth()]} ${pad_zero2(date.getDate())} ${pad_zero2(date.getHours())}:${pad_zero2(date.getMinutes())}:${pad_zero2(date.getSeconds())}`
}

function date_format2(date){
  return `${MONTHS[date.getMonth()]} ${pad_zero2(date.getDate())} ${pad_zero2(date.getHours())}:${pad_zero2(date.getMinutes())}:${pad_zero2(date.getSeconds())}`
}

function date_parse(stellar_timestamp){
  let date = new Date(stellar_timestamp)
  return date_format(date)
}

// TODO. Currently this function is a quick & dirty hack. Should the date format change ever so slightly, this function would break! FIX THIS.
function datestr_to_secs(datestr){
  let time = datestr.slice(-8)
  let secs = new Date('1970-01-01T' + time + 'Z').getTime() / 1000
  return secs
}

function time_parse(stellar_timestamp){
  let date = new Date(stellar_timestamp)
  return `${pad_zero2(date.getHours())}:${pad_zero2(date.getMinutes())}:${pad_zero2(date.getSeconds())}`
}

function date2secs(date){
  return new Date(date).getTime() / 1000
}


// ----------------------------------------------------------------------
function date_show(){
  doc.querySelector('#clock0').innerText = date_format2(new Date())
  setTimeout(date_show, 1000)  // Recursion!
}



// ----------------------------------------------------------------------
function xhr_load(event){
  let response = JSON.parse(this.response)
  print(response._embedded.records)
}

function get_request(url){
  let xhr = new XMLHttpRequest()
  xhr.addEventListener('load', xhr_load)
  xhr.open('GET', url)
  xhr.send()
}

// Get the parameters from the URL!
function url_get(param_name){
  let url = new URL(window.location.href)
  let search_params = new URLSearchParams(url.search)
  return search_params.get(param_name)
}


// ---------------------------------------------------------------------------------------------------
function btn_disable(btn_id){
  let btn = doc.querySelector(`#${btn_id}`)
  btn.disabled = true
  btn.classList.add('mdl-button--disabled')
}

function btn_enable(btn_id){
  let btn = doc.querySelector(`#${btn_id}`)
  btn.disabled = false
  btn.classList.remove('mdl-button--disabled')
}

function spinner_disable(spinner_id){
  doc.querySelector(`#${spinner_id}`).classList.remove('is-active')
}

function spinner_enable(spinner_id){
  doc.querySelector(`#${spinner_id}`).classList.add('is-active')
}

function generic_error_snackbar_show(error){
  let snackbar_div = doc.querySelector('#snackbar_error')
  let snackbar_data = {message: error}
  snackbar_div.MaterialSnackbar.showSnackbar(snackbar_data)
  print(error)
}


// ------------------------------------------------------------------------------------------------
// These variables control what we display in the tables!

let PUBNET_HOME = 'https://horizon.stellar.org'
let TESTNET_HOME = 'https://horizon-testnet.stellar.org'
let PARAM_LIMIT = 8

let HORIZON = new StellarSdk.Server(TESTNET_HOME)

let PAGE_MIN = 1
let PAGE_NUMBER = PAGE_MIN


// ------------------------------------------------------------------------------------------------
let LEDGERS_HEADERS = ['closed', 'hash', 'previous hash', 'paging token', 'sequence', 'coins', 'transactions', 'operations', 'max tx size', 'fee pool', 'base fee', 'base reserve']
function ledger_get(ledger){
  return [date_parse(ledger.closed_at), ledger.hash, ledger.prev_hash, ledger.paging_token, ledger.sequence, Math.floor(ledger.total_coins).toLocaleString(), ledger.transaction_count, ledger.operation_count, ledger.max_tx_set_size, Math.floor(ledger.fee_pool), ledger.base_fee, Math.floor(ledger.base_reserve),]
}

let TRANSACTIONS_HEADERS = ['created', 'hash', 'ledger attribute', 'paging token', 'memo type', 'account', 'account sequence', 'fee paid', 'operations']
function transaction_get(transaction){
  return [date_parse(transaction.created_at), transaction.hash, transaction.ledger_attr, transaction.paging_token, transaction.memo_type, transaction.source_account, transaction.source_account_sequence, transaction.fee_paid, transaction.operation_count,]
}

let OPERATIONS_HEADERS = ['id', 'type', 'amount', 'source account', 'paging token', 'price', 'asset code', 'asset issuer', 'asset type', 'buying asset code', 'buying asset issuer', 'buying asset type', 'selling asset code', 'selling asset issuer', 'selling asset type', 'offer id', 'from', 'to', 'into', 'account', 'funder', 'starting balance', 'signer key', 'signer weight', 'master key weight', 'low threshold', 'med threshold', 'high threshold', 'home domain', 'trustee', 'trustor']
function operation_get(operation){
  return [operation.id, operation.type, operation.amount, operation.source_account, operation.paging_token, operation.price, operation.asset_code, operation.asset_issuer, operation.asset_type, operation.buying_asset_code, operation.buying_asset_issuer, operation.buying_asset_type, operation.selling_asset_code, operation.selling_asset_issuer, operation.selling_asset_type, operation.offer_id, operation.from, operation.to, operation.into, operation.account, operation.funder, operation.starting_balance, operation.signer_key, operation.signer_weight, operation.master_key_weight, operation.low_threshold, operation.med_threshold, operation.high_threshold, operation.home_domain, operation.trustee, operation.trustor]
}

let EFFECTS_HEADERS = ['id', 'type', 'amount', 'asset', 'paging token', 'account', 'bought amount', 'bought asset', 'offer id', 'seller', 'sold amount', 'sold asset code', 'sold asset issuer', 'sold asset type']
function effect_get(effect){
  return [effect.id, effect.type, effect.amount, effect.asset_type, effect.paging_token, effect.account, effect.bought_amount, effect.bought_asset_type, effect.offer_id, effect.seller, effect.sold_amount, effect.sold_asset_code, effect.sold_asset_issuer, effect.sold_asset_type,]
}

let PAYMENTS_HEADERS = ['id', 'asset type', 'amount', 'paging token', 'from', 'to', 'type']
function payment_get(payment){
  return [payment.id, payment.asset_type, payment.amount, payment.paging_token, payment.from, payment.to, payment.type]
}

let OFFERS_HEADERS = ['id', 'amount', 'price', 'seller', 'buying asset code', 'buying asset type', 'buying asset issuer', 'selling asset code', 'selling asset type', 'selling asset issuer', 'paging token']
function offer_get(offer){
  return [offer.id, offer.amount, offer.price, offer.seller, undefined2na(native2xlm(offer.buying.asset_type, offer.buying.asset_code)), offer.buying.asset_type, undefined2na(offer.buying.asset_issuer), undefined2na(native2xlm(offer.selling.asset_type, offer.selling.asset_code)), offer.selling.asset_type, undefined2na(offer.selling.asset_issuer), offer.paging_token]
}


// ---------------------------------------------------------------------------------------------------
// Build our tables programatically!

// Build our table head programatically!
function table_head_build(table_id, headers){
  let table = doc.querySelector(table_id)
  let n_cols = headers.length

  header_html = '<tr>'
  for(let j=0; j<n_cols; ++j)
    header_html += `<th>${headers[j]}</th>`

  header_html += '</tr>'
  table.tHead.innerHTML = header_html
}

// Build our table rows programatically!
function table_rows_build(table_id, n_rows){
  let table = doc.querySelector(table_id)
  let n_cols = table.tHead.rows[0].cells.length
  let col = '<td></td>'.repeat(n_cols)

  let rows_html = ''
  for(let i=0; i<n_rows; ++i)
    rows_html += '<tr style=\'display:none;\'>' + col + '</tr>'  // Rows start off hidden!

  table.tBodies[0].innerHTML = rows_html
  componentHandler.upgradeElement(table)
}

// An abstraction layer to build INITIAL tables for certain objects!
function table_object_build(table_id, objects, object_get, objects_headers){
  let table = doc.querySelector(table_id)

  for(let i=0; i<objects.length; ++i){  // Build all rows in a table!
    let table_row = table.tBodies[0].rows[i]
    let object = object_get(objects[i])
    table_row.style.display = ''

    for(let j=0; j<objects_headers.length; ++j)  // Build a cols in a row!
      table_row.cells[j].innerText = undefined2na(object[j])
  }
}

// Update a whole object table when we receive data for a new first row!
function table_object_update(table_id, object, object_get, objects_headers){
  let table_rows = doc.querySelector(table_id).tBodies[0].rows
  let table_row0 = table_rows[0]
  object = object_get(object)

  // -------
  for(let i=table_rows.length-1; i > 0; --i){  // Build all ROWS of the table BUT the first!
    table_rows[i].innerHTML = table_rows[i-1].innerHTML
    if(table_rows[i].cells[0].innerText)  table_rows[i].style.display = ''
  }

  // -------
  for(let j=0; j<objects_headers.length; ++j)  // Build the first row of the table (ie. all CELLS in the first row)!
    table_row0.cells[j].innerText = undefined2na(object[j])
}


// ---------------------------------------------------------------------------------------------------
// Implementation for the TESTNET/PUBNET button! =D

function horizon_btn(url_params=''){
  doc.querySelector('#btn_horizon').onclick = function(event){
    if(this.innerText == 'TESTNET')   window.location = `?server=pubnet${url_params}`
    else                              window.location = `?server=testnet${url_params}`
  }
}

// ---------------------
let horizon = url_get('server')
doc.querySelector('#btn_horizon').innerText = horizon == 'testnet' ? horizon : 'pubnet'

HORIZON = new StellarSdk.Server(horizon == 'testnet' ? TESTNET_HOME : PUBNET_HOME)


// ------------------------------------------------------------------------------------------------
// Call global functions!

date_show()  // Update GUI timer!


// ID   GAECJVZ55YDSVO7KYNWSTFFTGF4AJ7DJH6O6WTTR33KCA2UBT4KOKBLY
// seed SAUI2E4EM7UW6PZ6FWXNRZC7GOTTHQHECXMQFWYVY43XCN7CLGRGEXWG

// ID   GDRTRNSP7T33KH3UYXX4I6I42ZVCKVYJ5P2W3KIJCYFK7IPLHOU7HZYJ
// seed SCHNDPDUBW44G4BJCGORKR7LJCN77EMZZOFYLRGZUHTABNFP7XOZ5J5M

// ID   GAPFRGD6WLIS3INGOFCFQFYZF3ESLXFGYZONZIKVCVBYXIYUEKZZD4CG
// seed SB6K6MC6LD3FCZ4VSXGYB2IT7MJACQ4SHVUQ74VWQLMJEAGACI5JOCQU

// GBS6ERKLXEBEJZLDLOICSMSOPQSRZUIJHH6RUSGLYP3I2IMJOU4SJC75
