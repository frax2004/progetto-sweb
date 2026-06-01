@echo off

tsc script_APIReference.ts --experimentalDecorators --emitDecoratorMetadata --types node --ignoreConfig

node script_APIReference.js