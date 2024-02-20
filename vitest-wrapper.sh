#!/bin/sh

# Get the first argument (the test file path)
testFilePath=$1

# Run vitest with the test file path
yarn vitest $testFilePath