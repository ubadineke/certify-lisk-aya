pragma circom 2.0.0;

include "circomlib/circuits/poseidon.circom";
include "circomlib/circuits/comparators.circom";

template IsNonZero() {
    signal input in;
    signal output out;
    out <== (in != 0);
}

template HashCheck() {
    signal input data[2];
    signal input hash;
    signal output isValid;

    component hasher = Poseidon(2);
    hasher.inputs[0] <== data[0];
    hasher.inputs[1] <== data[1];

    component isEqual = IsEqual();
    isEqual.in[0] <== hasher.out;
    isEqual.in[1] <== hash;

    isValid <== isEqual.out;
}

template RWAVerification() {
    signal input productId;
    signal input ipfsHash;
    signal input dataHash;

    signal output isProductValid;
    signal output isDataAuthentic;

    component checkProductId = IsNonZero();
    component checkIpfsHash = IsNonZero();

    checkProductId.in <== productId;
    checkIpfsHash.in <== ipfsHash;

    isProductValid <== checkProductId.out * checkIpfsHash.out;

    component hashChecker = HashCheck();
    hashChecker.data[0] <== productId;
    hashChecker.data[1] <== ipfsHash;
    hashChecker.hash <== dataHash;

    isDataAuthentic <== hashChecker.isValid;
}

component main { public [ productId ] } = RWAVerification();