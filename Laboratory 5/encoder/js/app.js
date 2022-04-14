var app = new Vue({
    el: '#baseband-encoder',
    data: {
        bits: [],
        encodedBitsNRZL: [],
        encodedBitsNRZM: [],
        encodedBitsNRZS: [],
        encodedBitsRZ: [],
        encodedBitsBL: [], 
        encodedBitsBM: [], 
        encodedBitsBS: [],
        encodedBitsB_L: [],
        encodedBitsDELAY: [],
        status: '',
        numberOfBits: 13,
        validateBit: validateBit
    },
    created: function () {
        this.bits = getBitstream(this.numberOfBits);
    },
    methods: {
        encode: function(){
            this.encodedBitsNRZL = getNRZL(this.bits);
            this.encodedBitsNRZM = getNRZM(this.bits);
            this.encodedBitsNRZS = getNRZS(this.bits);
            this.encodedBitsRZ = getRZ(this.bits);
            this.encodedBitsBL = getBL(this.bits);
            this.encodedBitsBM = getBM(this.bits);
            this.encodedBitsBS = getBS(this.bits);
            this.encodedBitsB_L = getB_L(this.bits);
            this.encodedBitsDELAY = getDELAY(this.bits);
        },
    }
})


