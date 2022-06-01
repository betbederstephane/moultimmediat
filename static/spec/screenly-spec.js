// Generated by CoffeeScript 1.12.5
(function() {
  describe("Screenly Open Source", function() {
    it("should have a Screenly object at its root", function() {
      return expect(Screenly).toBeDefined();
    });
    describe("date_to", function() {
      var a_date, test_date;
      test_date = new Date(2014, 5, 6, 14, 20, 0, 0);
      a_date = Screenly.date_to(test_date);
      it("should format date and time as 'MM/DD/YYYY hh:mm:ss A'", function() {
        return expect(a_date.string()).toBe('06/06/2014 02:20:00 PM');
      });
      it("should format date as 'MM/a_date/YYYY'", function() {
        return expect(a_date.date()).toBe('06/06/2014');
      });
      return it("should format date as 'hh:mm:ss A'", function() {
        return expect(a_date.time()).toBe('02:20 PM');
      });
    });
    describe("Models", function() {
      return describe("Asset model", function() {
        var asset, end_date, start_date;
        it("should exist", function() {
          return expect(Screenly.Asset).toBeDefined();
        });
        start_date = new Date(2014, 4, 6, 14, 20, 0, 0);
        end_date = new Date();
        end_date.setMonth(end_date.getMonth() + 2);
        asset = new Screenly.Asset({
          asset_id: 2,
          duration: "8",
          end_date: end_date,
          is_enabled: true,
          mimetype: 'webpage',
          name: 'Test',
          start_date: start_date,
          uri: 'http://www.screenlyapp.com'
        });
        it("should be active if enabled and date is in range", function() {
          return expect(asset.active()).toBe(true);
        });
        it("should be inactive if disabled and date is in range", function() {
          asset.set('is_enabled', false);
          return expect(asset.active()).toBe(false);
        });
        it("should be inactive if enabled and date is out of range", function() {
          asset.set('is_enabled', true);
          asset.set('start_date', asset.get('end_date'));
          return expect(asset.active()).toBe(false);
        });
        it("should rollback to backup data if it exists", function() {
          asset.set('start_date', start_date);
          asset.set('end_date', end_date);
          asset.backup();
          asset.set({
            is_enabled: false,
            name: "Test 2",
            start_date: new Date(2011, 4, 6, 14, 20, 0, 0),
            end_date: new Date(2011, 4, 6, 14, 20, 0, 0),
            uri: "http://www.wireload.net"
          });
          asset.rollback();
          expect(asset.get('is_enabled')).toBe(true);
          expect(asset.get('name')).toBe('Test');
          expect(asset.get('start_date')).toBe(start_date);
          return expect(asset.get('uri')).toBe("http://www.screenlyapp.com");
        });
        return it("should erase backup date after rollback", function() {
          asset.set({
            is_enabled: false,
            name: "Test 2",
            start_date: new Date(2011, 4, 6, 14, 20, 0, 0),
            end_date: new Date(2011, 4, 6, 14, 20, 0, 0),
            uri: "http://www.wireload.net"
          });
          asset.rollback();
          expect(asset.get('is_enabled')).toBe(false);
          expect(asset.get('name')).toBe('Test 2');
          expect(asset.get('start_date').toISOString()).toBe((new Date(2011, 4, 6, 14, 20, 0, 0)).toISOString());
          return expect(asset.get('uri')).toBe("http://www.wireload.net");
        });
      });
    });
    describe("Collections", function() {
      return describe("Assets", function() {
        it("should exist", function() {
          return expect(Screenly.Assets).toBeDefined();
        });
        it("should use the Asset model", function() {
          var assets;
          assets = new Screenly.Assets();
          return expect(assets.model).toBe(Screenly.Asset);
        });
        return it("should keep play order of assets", function() {
          var asset1, asset2, asset3, assets;
          assets = new Screenly.Assets();
          asset1 = new Screenly.Asset({
            asset_id: 1,
            is_enabled: true,
            name: 'AAA',
            uri: 'http://www.screenlyapp.com',
            play_order: 2
          });
          asset2 = new Screenly.Asset({
            asset_id: 2,
            is_enabled: true,
            name: 'BBB',
            uri: 'http://www.screenlyapp.com',
            play_order: 1
          });
          asset3 = new Screenly.Asset({
            asset_id: 3,
            is_enabled: true,
            name: 'CCC',
            uri: 'http://www.screenlyapp.com',
            play_order: 0
          });
          assets.add([asset1, asset2, asset3]);
          expect(assets.at(0)).toBe(asset3);
          expect(assets.at(1)).toBe(asset2);
          expect(assets.at(2)).toBe(asset1);
          asset1.set('play_order', 0);
          asset3.set('play_order', 2);
          assets.sort();
          expect(assets.at(0)).toBe(asset1);
          expect(assets.at(1)).toBe(asset2);
          return expect(assets.at(2)).toBe(asset3);
        });
      });
    });
    return describe("Views", function() {
      it("should have AddAssetView", function() {
        return expect(Screenly.View.AddAssetView).toBeDefined();
      });
      it("should have EditAssetView", function() {
        return expect(Screenly.View.EditAssetView).toBeDefined();
      });
      it("should have AssetRowView", function() {
        return expect(Screenly.View.AssetRowView).toBeDefined();
      });
      return it("should have AssetsView", function() {
        return expect(Screenly.View.AssetsView).toBeDefined();
      });
    });
  });

}).call(this);
