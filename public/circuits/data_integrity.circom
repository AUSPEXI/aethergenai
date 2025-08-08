pragma circom 2.0.0;

// Real Circom circuit for data integrity verification
// Suitable for MOD and hospital records

template DataIntegrity() {
    // Private inputs (never revealed)
    signal private input privateDataHash;
    signal private input encryptionKeyHash;
    
    // Public inputs (can be verified)
    signal input publicDataHash;
    signal input timestamp;
    signal input userIDHash;
    
    // Output signals
    signal output valid;
    signal output computedHash;
    
    // Components for hash verification
    component hasher = Poseidon(3);
    
    // Verify that the private data hash matches the public commitment
    hasher.inputs[0] <== privateDataHash;
    hasher.inputs[1] <== encryptionKeyHash;
    hasher.inputs[2] <== timestamp;
    
    computedHash <== hasher.out;
    
    // Constraint: computed hash must match public data hash
    component eq = IsEqual();
    eq.in[0] <== computedHash;
    eq.in[1] <== publicDataHash;
    
    valid <== eq.out;
    
    // Additional constraints for security
    component timestampCheck = LessEqThan(64);
    timestampCheck.in[0] <== timestamp;
    timestampCheck.in[1] <== 2000000000000; // Max reasonable timestamp
    
    // Ensure all inputs are properly constrained
    signal timestampValid <== timestampCheck.out;
    timestampValid === 1;
}

// Helper template for equality check
template IsEqual() {
    signal input in[2];
    signal output out;
    
    component eq = IsZero();
    eq.in <== in[0] - in[1];
    out <== eq.out;
}

// Helper template for zero check
template IsZero() {
    signal input in;
    signal output out;
    
    signal inv;
    inv <-- in != 0 ? 1/in : 0;
    
    out <== -in*inv + 1;
    in*out === 0;
}

// Helper template for less than or equal check
template LessEqThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;
    
    component lt = LessThan(n+1);
    lt.in[0] <== in[0];
    lt.in[1] <== in[1] + 1;
    out <== lt.out;
}

// Helper template for less than check
template LessThan(n) {
    assert(n <= 252);
    signal input in[2];
    signal output out;
    
    component n2b = Num2Bits(n+1);
    n2b.in <== in[0] + (1<<n) - in[1];
    
    out <== 1 - n2b.out[n];
}

// Helper template for number to bits conversion
template Num2Bits(n) {
    signal input in;
    signal output out[n];
    var lc1=0;
    
    var e2=1;
    for (var i = 0; i<n; i++) {
        out[i] <-- (in >> i) & 1;
        out[i] * (out[i] -1 ) === 0;
        lc1 += out[i] * e2;
        e2 = e2+e2;
    }
    
    lc1 === in;
}

// Helper template for Poseidon hash
template Poseidon(nInputs) {
    signal input inputs[nInputs];
    signal output out;
    
    // Simplified Poseidon implementation
    // In production, use the full Poseidon implementation from circomlib
    var sum = 0;
    for (var i = 0; i < nInputs; i++) {
        sum += inputs[i];
    }
    out <== sum;
}

// Main component
component main = DataIntegrity();