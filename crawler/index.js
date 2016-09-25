var request = require('request');
var cheerio = require('cheerio');

request('http://www.catho.com.br/vagas/por-cargo/view/profissional/51/', function(err, res, body) {
  if (err) console.log('Erro: ' + err);

  var $ = cheerio.load(body);

  var list = [];
  var total = 0;
  var totalx = 0;

  $('td').each(function(index){
    var title = $(this).find('h3').text();
    var desc = $(this).find('span').text();
    desc = desc.split(" ");
    desc = parseInt(desc[0]);

    if (desc > 100){
      list.push({title: title, desc: desc});
      total += desc;
    }
  });

  list = list.sort(function (a, b) { return b.desc - a.desc; });

  for (var i in list){
    var percent = list[i].desc / total * 100;
    percent = percent.toPrecision(2);

    console.log(i + " " + list[i].title + " -  " + list[i].desc + " vagas >> " + percent + "%");
  }

  console.log("Total: " + total + " vagas");

});
