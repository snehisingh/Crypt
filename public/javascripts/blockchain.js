
var difficulty = 4;        
var maximumNonce = 500000; 
var pattern = '';
for (var x=0; x<difficulty; x++) {
  pattern += '0';
}

function sha256(block, chain) {
  return CryptoJS.SHA256(getText(block, chain));
}

function updateState(block, chain) {
  if ($('#block'+block+'chain'+chain+'hash').val().substr(0, difficulty) === pattern) {
    $('#block'+block+'chain'+chain+'well').removeClass('well-error').addClass('well-success');
  }
  else {
    $('#block'+block+'chain'+chain+'well').removeClass('well-success').addClass('well-error');
  }
}

function updateHash(block, chain) {
  $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
  updateState(block, chain);
}

function updateChain(block, chain) {
  for (var x = block; x <= 5; x++) {
    if (x > 1) {
      $('#block'+x+'chain'+chain+'previous').val($('#block'+(x-1).toString()+'chain'+chain+'hash').val());
    }
    updateHash(x, chain);
  }
}

function mine(block, chain, isChain) {
  for (var x = 0; x <= maximumNonce; x++) {
    $('#block'+block+'chain'+chain+'nonce').val(x);
    $('#block'+block+'chain'+chain+'hash').val(sha256(block, chain));
    if ($('#block'+block+'chain'+chain+'hash').val().substr(0, difficulty) === pattern) {
      if (isChain) {
        updateChain(block, chain);
      }
      else {
        updateState(block, chain);
      }
      break;
    }
  }
}
