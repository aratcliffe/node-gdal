'use strict';

var fs = require('fs');
var gdal = require('../lib/gdal.js');
var ogr = gdal.ogr;
var assert = require('chai').assert;

// http://epsg.io/
// http://spatialreference.org/ref/

describe('SpatialReference', function() {
	it('should be exposed', function() {
		assert.ok(ogr.SpatialReference);
	});
	it('should be instantiable', function() {
		assert.instanceOf(new ogr.SpatialReference(), ogr.SpatialReference);
	});
	describe('fromWKT()', function() {
		it('should return SpatialReference', function() {
			var wkt = 'PROJCS["NAD_1983_UTM_Zone_10N",' +
				'GEOGCS["GCS_North_American_1983",' +
				'DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137,298.257222101]],' +
				'PRIMEM["Greenwich",0],UNIT["Degree",0.0174532925199433]],' +
				'PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],' +
				'PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-123.0],' +
				'PARAMETER["Scale_Factor",0.9996],PARAMETER["Latitude_of_Origin",0.0],' +
				'UNIT["Meter",1.0]]';

			var ref = ogr.SpatialReference.fromWKT(wkt);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe('fromProj4()', function() {
		it('should return SpatialReference', function() {
			var proj = '+proj=stere +lat_ts=-37 +lat_0=-90 +lon_0=145 +k_0=1.0 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs';
			var ref = ogr.SpatialReference.fromProj4(proj);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe('fromEPSG()', function() {
		it('should return SpatialReference', function() {
			var epsg = 4326;
			var ref = ogr.SpatialReference.fromEPSG(epsg);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe('fromEPSGA()', function() {
		it('should return SpatialReference', function() {
			var epsga = 26910;
			var ref = ogr.SpatialReference.fromEPSGA(epsga);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe.skip('fromERSI()', function() {
		it('should return SpatialReference', function() {
			var esri = 'GEOGCS["GCS_North_American_1983",DATUM["D_North_American_1983",SPHEROID["GRS_1980",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]';
			var ref = ogr.SpatialReference.fromESRI(esri);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe.skip('fromXML', function() {
		it('should return SpatialReference', function() {
			var gml = fs.readFileSync(__dirname + '/data/srs/sample.gml', 'utf8');
			var ref = ogr.SpatialReference.fromXML(gml);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe('fromWMSAUTO', function() {
		it('should return SpatialReference', function() {
			var wms = 'AUTO:42001,99,8888';
			var ref = ogr.SpatialReference.fromWMSAUTO(wms);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe.skip('fromURN', function() {
		it('should return SpatialReference', function() {
			var wms = 'urn:ogc:def:crs:EPSG::26912';
			var ref = ogr.SpatialReference.fromWMSAUTO(wms);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
	describe.skip('fromCRSURL', function() {
		it('should return SpatialReference', function() {
			var wms = 'CRS:84';
			var ref = ogr.SpatialReference.fromCRSURL(wms);
			assert.instanceOf(ref, ogr.SpatialReference);
		});
	});
});