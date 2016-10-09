var request = require('request');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

function getRequest(response){
  request('http://www.catho.com.br/vagas/por-cargo/view/profissional/51/', function(err, res, body) {
    if (err) console.log('Erro: ' + err);

    var $ = cheerio.load(body);

    var list = [];
    var total = 0;

    $('td').each(function(index){
      var title = $(this).find('h3').text();
      var desc = $(this).find('span').text();
      desc = desc.split(" ");
      vagas = parseInt(desc[0]);

      if (vagas > 100){
        list.push({title: title, vagas: vagas});
        total += vagas;
      }
    });

    list = list.sort(function (a, b) { return b.vagas - a.vagas; });

    for (var i in list){
      var percent = list[i].vagas / total * 100;
      percent = percent.toPrecision(2);

      response.write("<li> " + i + " " + list[i].title + " -  " + list[i].vagas + " vagas >> " + percent + "% </li>");
    }
    response.end("</ul> Total: " + total + " vagas");
  });
}

app.get('/', function (req, response) {
  response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  response.write("<ul>");
  getRequest(response);
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
