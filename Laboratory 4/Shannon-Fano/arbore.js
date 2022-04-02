// Controll variables
let new_tree = "";

var letters = new Array();
var new_codes = new Array();
var compresion_rate;

// Frequency vector
var frequency = Array.apply(0, Array(255)).map(function() {});

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 3060 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// Append the svg object to the body of the page
// Appends a 'group' element to 'svg'
// Moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

var i = 0, duration = 750, root;

// Declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Update the graph to appear on the page
function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
      });

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; });

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}

// Event for button click
function encode() {
  var message = document.getElementById("message").value;

  // Computing frequency
  clear_array(frequency);
  letters = [];
  new_codes = [];

  for(let i=0; i < message.length; i++) {
    frequency[message.charCodeAt(i)]++;
  }

  for(let i=0; i < 255; i++) {
    if(frequency[i] != 0) {
      letters.push({key: String.fromCharCode(i), value: frequency[i]});
    }
  }

  letters.sort(function (x, y) {
    var n = y.value - x.value;
    if (n !== 0) {
        return n;
    }

    return x.key - y.key;
  });

  // Creating the graph
  new_tree = " {" + gen_json(letters, 'A', '0') + " }";

  const tree = JSON.parse(new_tree);

  root = d3.hierarchy(tree, function(d) { return d.children; });
  root.x0 = height / 2;
  root.y0 = 0;

  update(root)

  // Computing compression rate and new codes
  get_codes();

  // Update the html tabel
  update_tabel();
}
 
// Generating the JSON string
function gen_json(array, name, side) {
  var sum = get_sum(array);

  name += side;

  if(array.length == 1) {
    new_codes.push({key: array[0].key, value: name})
    return '"name": "' +   name + ': ' + array[0].key + '"';
  }

  var aux_sum = 0;
  var index;
  for(let i = array.length-1; i>=0; i--) {
    if(parseInt(sum/2) > aux_sum) {
      aux_sum += array[i].value;
      index = i;
    }
  }

  var left = array.slice(0,index);
  var right = array.slice(index);

  return ' "name": "' + name + '", "children": [ { ' + gen_json(left, name, 'L') + ' }, { ' +   gen_json(right, name, 'R') + ' } ]';
}

// Generating the new code for the characters
function get_codes() {
  var cod = "";
  var c = 0;
  var o = get_sum(letters)*8;

  for(let i = 0; i < new_codes.length; i++) {
    cod = "";
    for(let j = 2; j < new_codes[i].value.length; j++) {
      if(new_codes[i].value[j] == 'R')
        cod += '1';
      else
        cod += '0';
    }
    c += cod.length * letters[i].value;
    new_codes[i].value = cod;
  }
  compresion_rate = (1-c/o)*100
}

// Updating the html tabel
function update_tabel() {
  var th = "<tr>";
  var t = "<tr>";

  for (var i = 0; i < new_codes.length; i++){
        th += "<td>" + new_codes[i].key + "</td>";

        t += "<td>" + new_codes[i].value + "</td>";
  }
  th += "</tr>";
  t += "</tr>";

  document.getElementById("tabel_cod").innerHTML = "";
  document.getElementById("tabel_cod").innerHTML += th;
  document.getElementById("tabel_cod").innerHTML += t;

  document.getElementById("compression_rate").innerHTML = "";
  document.getElementById("compression_rate").innerHTML += "Compression rate: " + compresion_rate;
}

// Empty an array
function clear_array(array) {
  for(let i = 0; i < array.length; i++) {
    array[i] = 0;
  }
}

// Sum of the frequency
function get_sum(array) {
  var sum = 0; 
  for(let i = 0; i < array.length; i++) {
    sum = sum + array[i].value;
  }
  return sum;
}
