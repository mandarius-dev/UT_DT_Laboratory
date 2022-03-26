function decode(bits) {
	if(bits.length == 8) {
		var z4=parity(bits[4]+bits[5]+bits[6]+bits[7]);
		var z2=parity(bits[2]+bits[3]+bits[6]+bits[7]);
		var z1=parity(bits[1]+bits[3]+bits[5]+bits[7]);
		
		var errorPosition=z1*1+z2*2+z4*4;
		console.log("\n Errror detected at bit: " + (errorPosition + 1) + "\n");
	}
	else
	{
		var z8=parity(bits[8]+bits[9]+bits[10]+bits[11]+bits[12]);
		var z4=parity(bits[4]+bits[5]+bits[6]+bits[7]+bits[12]);
		var z2=parity(bits[2]+bits[3]+bits[6]+bits[7]+bits[10]+bits[11]);
		var z1=parity(bits[1]+bits[3]+bits[5]+bits[7]+bits[9]+bits[11]);
		
		var errorPosition=z1*1+z2*2+z4*4+z8*8;
		console.log("\n Errror detected at bit: " + (errorPosition + 1) + "\n");
	}
	
	var parityBit=bits[0];
	for(let i=1; i<bits.length; i++) { 
		parityBit = parity(parityBit+bits[i])
	}

	var errorDetected=false;
	if(parityBit == 0 && errorPosition == 0) {
		errorDetected = false;
		return { errorCorrected: errorDetected, errorPosition: -1, bits: bits };
	}

	if(parityBit == 0 && errorPosition != 0) {
		errorDetected = true;
		errorPosition = -1;
		return { errorCorrected: errorDetected, errorPosition: errorPosition, bits: bits };
	}

	if(parityBit != 0 && errorPosition == 0) {
		errorDetected = true;
		bits[0]=parity(bits[0]+1);
		console.log("\n Corrected sequence: " + bits + "\n");
		return { errorCorrected: errorDetected, errorPosition: 0, bits: bits };
	}

	if(parityBit != 0 && errorPosition != 0) {
		errorDetected = true;
		bits[errorPosition]=parity(bits[errorPosition]+1);
		console.log("\n Corrected sequence: " + bits + "\n");
		return { errorCorrected: errorDetected, errorPosition: errorPosition, bits: bits };
	}
}

parity = function(number){
	return number % 2;
}

exports.decode = decode;
