'use strict';
var fsExtra = require('fs-extra');
var path = require('path');
var writeGltf = require('../../lib/writeGltf');
var readGltf = require('../../lib/readGltf');

var gltfPath = './specs/data/boxTexturedUnoptimized/CesiumTexturedBoxTest_BinaryInput.gltf';
var outputGltfPath = './output/CesiumTexturedBoxTest.gltf';
var invalidPath = './specs/data/boxTexturedUnoptimized/CesiumTexturedBoxTest.exe';

describe('writeGltf', function() {
    it('will write a file to the correct directory', function(done) {
        var spy = spyOn(fsExtra, 'outputJson').and.callFake(function(file, data, callback) {
            // callback();
            return;
        });
        var options = {
            outputPath : outputGltfPath,
            embed : true,
            embedImage : true,
            createDirectory : false
        };
        
        writeGltf(gltfPath, options)
            .then(function () {
                expect(path.normalize(spy.calls.first().args[0])).toEqual(path.normalize(outputGltfPath));
                done();
            });
    });

    it('throws an invalid output path error', function() {
        var readOptions = {};
        var writeOptions = {
            outputPath : undefined,
            embed : true,
            embedImage : true,
            createDirectory : true
        };
        
        readGltf(gltfPath, readOptions, function(gltf) {
            expect(function() {
                writeGltf(gltf, writeOptions);
            }).toThrowError('Output path is undefined.');
        });
    });

    it('throws an invalid output extension error', function() {
        var readOptions = {};
        var writeOptions = {
            outputPath : invalidPath,
            embed : true,
            embedImage : true,
            createDirectory : true
        };
        
        readGltf(gltfPath, readOptions, function(gltf) {
            expect(function() {
                writeGltf(gltf, writeOptions);
            }).toThrowError('Invalid output path extension.');
        });
    });

});
