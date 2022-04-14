function getNRZL(bits) {
  var result = [];
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if (i == 0 && parseInt(bits[i].value) == 1) symbol = '▔▔';
      else if ((i == 0 && parseInt(bits[i].value) == 0)) symbol = '▁▁';

      if (i > 0 && parseInt(bits[i-1].value) == 1 && parseInt(bits[i].value) == 0) symbol = '∣▁▁';
      if (i > 0 && parseInt(bits[i-1].value) == 0 && parseInt(bits[i].value) == 0) symbol = '▁▁';

      if (i > 0 && parseInt(bits[i-1].value) == 0 && parseInt(bits[i].value) == 1) symbol = '∣▔▔';
      if (i > 0 && parseInt(bits[i-1].value) == 1 && parseInt(bits[i].value) == 1) symbol = '▔▔';

      result.push(symbol);
  }
  return result;
}

function getNRZM(bits) {
  var result = [];
  var state = false;
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if(!state && parseInt(bits[i].value) == 0) symbol = '▁▁';
      if(state && parseInt(bits[i].value) == 0) symbol = '▔▔';

      if(!state && parseInt(bits[i].value) == 1) { symbol = '∣▔▔'; state = true; result.push(symbol); continue; }
      if(state && parseInt(bits[i].value) == 1) { symbol = '∣▁▁'; state = false; result.push(symbol);  continue; }

      result.push(symbol);
  }
  return result;
}

function getNRZS(bits) {
  var result = [];
  var state = false;
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if(!state && parseInt(bits[i].value) == 0) { symbol = '∣▔▔'; state = true; result.push(symbol); continue; }
      if(state && parseInt(bits[i].value) == 0) { symbol = '∣▁▁'; state = false; result.push(symbol);  continue; }

      if(!state && parseInt(bits[i].value) == 1) symbol = '▁▁';
      if(state && parseInt(bits[i].value) == 1) symbol = '▔▔';

      result.push(symbol);
  }
  return result;
}

function getRZ(bits) {
  var result = [];
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if (parseInt(bits[i].value) == 1) symbol = '∣▔∣▁';
      if (parseInt(bits[i].value) == 0) symbol = '▁▁';

      result.push(symbol);
  }
  return result;
}

function getBL(bits) {
  var result = [];
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if (i == 0 && parseInt(bits[i].value) == 1) symbol = '∣▔∣▁';
      else if ((i == 0 && parseInt(bits[i].value) == 0)) symbol = '▁∣▔';

      if (i > 0 && parseInt(bits[i-1].value) == 1 && parseInt(bits[i].value) == 0) symbol = '▁∣▔';
      if (i > 0 && parseInt(bits[i-1].value) == 0 && parseInt(bits[i].value) == 0) symbol = '∣▁∣▔';

      if (i > 0 && parseInt(bits[i-1].value) == 0 && parseInt(bits[i].value) == 1) symbol = '▔∣▁';
      if (i > 0 && parseInt(bits[i-1].value) == 1 && parseInt(bits[i].value) == 1) symbol = '∣▔∣▁';

      result.push(symbol);
  }
  return result;
}

function getBM(bits) {
  var result = [];
  var state = false;
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if(!state && parseInt(bits[i].value) == 0) { symbol = '∣▔▔'; state = true; result.push(symbol); continue; }
      if(state && parseInt(bits[i].value) == 0) { symbol = '∣▁▁'; state = false; result.push(symbol);  continue; }

      if(!state && parseInt(bits[i].value) == 1) { symbol = '∣▔∣▁'; result.push(symbol); continue; }
      if(state && parseInt(bits[i].value) == 1) { symbol = '∣▁∣▔'; result.push(symbol);  continue; }

      result.push(symbol);
  }
  return result;
}

function getBS(bits) {
  var result = [];
  var state = false;
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if (!state && parseInt(bits[i].value) == 0) { symbol = '∣▔∣▁'; result.push(symbol); continue; }
      if (state && parseInt(bits[i].value) == 0) { symbol = '∣▁∣▔'; result.push(symbol); continue; }

      if (!state && parseInt(bits[i].value) == 1) { symbol = '∣▔▔'; state = true; result.push(symbol); continue; }
      if (state && parseInt(bits[i].value) == 1) { symbol = '∣▁▁'; state = false; result.push(symbol);  continue; }

      result.push(symbol);
  }
  return result;
}

function getB_L(bits) {
  var result = [];
  var state = false;
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if (!state && parseInt(bits[i].value) == 0) { symbol = '∣▔∣▁'; result.push(symbol); continue; }
      if (state && parseInt(bits[i].value) == 0) { symbol = '∣▁∣▔'; result.push(symbol); continue; }

      if (!state && parseInt(bits[i].value) == 1) { symbol = '▁∣▔'; state = true; result.push(symbol); continue; }
      if (state && parseInt(bits[i].value) == 1) { symbol = '▔∣▁'; state = false; result.push(symbol);  continue; }

      result.push(symbol);
  }
  return result;
}

function getDELAY(bits) {
  var result = [];
  var state = false;
  for (var i = 0; i < bits.length; i++) {
      let symbol = '⚋⚋';

      if (i == 0 && parseInt(bits[i].value) == 1) { symbol = '▁∣▔'; state = true; result.push(symbol); continue; }
      else if ((i == 0 && parseInt(bits[i].value) == 0)) { symbol = '▁▁'; result.push(symbol); continue; }

      if (!state && parseInt(bits[i].value) == 0 && parseInt(bits[i-1].value) == 1) { symbol = '▁▁'; result.push(symbol); continue; }
      else if (!state && parseInt(bits[i].value) == 0 && parseInt(bits[i-1].value) == 0) { symbol = '∣▔▔'; state = true; result.push(symbol); continue; }

      if (state && parseInt(bits[i].value) == 0  && parseInt(bits[i-1].value) == 1) { symbol = '▔▔'; result.push(symbol); continue; }
      else if (state && parseInt(bits[i].value) == 0 && parseInt(bits[i-1].value) == 0) { symbol = '∣▁▁'; state = false; result.push(symbol); continue; }

      if (!state && parseInt(bits[i].value) == 1) { symbol = '▁∣▔'; state = true; result.push(symbol); continue; }
      if (state && parseInt(bits[i].value) == 1) { symbol = '▔∣▁'; state = false; result.push(symbol);  continue; }

      result.push(symbol);
  }
  return result;
}