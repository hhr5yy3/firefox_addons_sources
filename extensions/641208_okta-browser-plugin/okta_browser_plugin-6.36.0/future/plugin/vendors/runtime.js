(function() {
  let polyfill;
  if (typeof self !== 'undefined') {
    polyfill = self;
  } else if (typeof window !== 'undefined') {
    polyfill = window;
  }

  var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'globalThis');
  if (!descriptor || (descriptor.configurable && (descriptor.enumerable || !descriptor.writable || globalThis !== polyfill))) {
    Object.defineProperty(polyfill, 'globalThis', {
      configurable: true,
      enumerable: false,
      value: polyfill,
      writable: true
    });
  }
}());

globalThis.__thrush_future_vendor_registry__ = globalThis.__thrush_future_vendor_registry__ || {};
globalThis.__thrush_future_vendor_dependencies__ = ["vendors/00f484c1f7a0604dbe7004d65730158c.js","vendors/0f9eaf49bfeb0a44aa8aa8c96d4eda1c.js","vendors/13c9ccf23db4f5766be4a575533b88f7.js","vendors/1c6fb1b468c34fd28192779c476f7b65.js","vendors/2052983bfe9e67de99ce2af5119d60f2.js","vendors/2204abc2c090725640cca63f96b52d33.js","vendors/266a1f7c2e2345169d3bc448da45eae6.js","vendors/379728233fb1a470213d21073ee31034.js","vendors/393b183093564f7c4c1319fc1cbcf6a0.js","vendors/3db3db06ed42d6dedd435e6fd1a4b29b.js","vendors/5d81984883dc91447cf8bc978cdcc1d6.js","vendors/734c229bfb138781fa7789842eba5f42.js","vendors/82ef521c524fe32e3baac43e9ad45134.js","vendors/8beed842be7e0d8daa6f0716f83e5f90.js","vendors/91a1fb0f617123e6c36eed4f24e89911.js","vendors/a4aa4f50d93dfcdaa1db0baeae81313e.js","vendors/b9919f90b8223f0ac5657ffc1862a6f8.js","vendors/bfffbf01410391dc6bbd8cddefd0921e.js","vendors/c4086bcb2315a13fa69d917d8dbffb2a.js","vendors/d0a1de474d2575716a28840ef502533e.js","vendors/e881f0efffff2cc3aa5908a2723ffbe3.js","vendors/ef7c876f00f3acddd00fa671f52d0b1f.js","vendors/f6d2bf8c79390cd34c1cbdcdd214f72f.js"];
globalThis.require = (key) => { return globalThis.__thrush_future_vendor_registry__[key] };
undefined;