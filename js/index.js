var rows = 200;
var cols = 55;
alert(
  "Prueba buscar palabras de 3 o 4 caracteres en esta sopa de letras semi-aleatoria. Busca en ocho direcciones (arriba/abajo, izq/der, y diagonales)"
);
var letters = randLetters(rows, cols);
createTable(letters);

function distLetters() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var repetitions = "31113111211121211221211111";
  var distributed = [];
  for (var i = 0; i < alphabet.length; i++) {
    for (var reps = 0; reps < repetitions[i]; reps++) {
      distributed.push(alphabet[i]);
    }
  }
  return distributed;
}

function randLetters(rows, cols) {
  // creates a matrix of random letters and a property set to false
  var array = [];
  var alphabetDist = distLetters();
  for (var i = 0; i < rows; i++) {
    array.push([]);
    for (var j = 0; j < cols; j++) {
      var randChar = parseInt(Math.random() * alphabetDist.length);
      array[i].push([alphabetDist[randChar], false]);
    }
  }
  return array;
}

function createTable(array) {
  // writes a table with the array's content in red elements with property true
  var html = "<table>";
  for (var i = 0; i < array.length; i++) {
    html += "<tr>";
    for (var j = 0; j < array[0].length; j++) {
      if (array[i][j][1]) {
        html += "<td class='checked'>" + array[i][j][0] + "</td>";
      } else {
        html += "<td>" + array[i][j][0] + "</td>";
      }
    }
    html += "</tr>";
  }
  html += "</table>";
  document.getElementById("tablaLetras").innerHTML = html;
}

function doSearch(key) {
  // searches the string in the array, if found set true property of element
  // and renders the table
  if (key.which == 13) {
    var s = search(this.value, letters);
    if (s != -1) {
      var startAt = s[0];
      var direct = s[1];
      var len = s[2];
      for (var i = 0; i < len; i++) {
        letters[startAt[0] + i * direct[0]][startAt[1] + i * direct[1]][
          1
        ] = true;
      }
      document.getElementById("found").innerHTML = "Encontrado en " + startAt;
    } else document.getElementById("found").innerHTML = "No encontrado :(";
    createTable(letters);
  }
}

function search(string, matrix) {
  // searches string in matrix if found returns the position, direction and length
  var position = [];
  var direction = [];
  var allD = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ];
  var length = string.length;
  var rows = matrix.length;
  var cols = matrix[0].length;

  string = string.toUpperCase();

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      if (string[0] == matrix[i][j][0]) {
        for (var k = 0; k < 8; k++) {
          if (
            i + allD[k][0] * length >= 0 &&
            i + allD[k][0] * length <= rows &&
            j + allD[k][1] * length >= 0 &&
            j + allD[k][1] * length <= cols
          ) {
            var chars = "";
            for (var l = 0; l < length; l++) {
              chars += matrix[i + allD[k][0] * l][j + allD[k][1] * l][0];
            }
            if (chars == string.toUpperCase()) {
              return [[i, j], allD[k], length];
            }
          }
        }
      }
    }
  }
  return -1;
}

document.getElementById("search").addEventListener("keypress", doSearch);