var validate = function (bits) {
        for (var i = 0; i < bits.length; i++) {
                if (this.validateBit(bits[i].value) === false)
                        return false;
        }
        return true;
}

var validateBit = function (character) {
        if (character === null) return false;
        return (parseInt(character) === 0 ||
                parseInt(character) === 1);
}

function getBitstream(n) {
        result = [];
        for (var i = 0; i < n; i++) {
                let bit = { value: null };
                result.push(bit);
        }
        return result;
}