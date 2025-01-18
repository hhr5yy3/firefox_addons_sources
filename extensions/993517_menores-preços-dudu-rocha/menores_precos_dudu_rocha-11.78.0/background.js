/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_ddr_bafais = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;




ddr_fertil.runtime.onStartup.addListener(() => __awaiter(void 0, void 0, void 0, function* () {

    yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.ddr_lambeei();
}));
ddr_fertil.runtime.onInstalled.addListener(() => __awaiter(void 0, void 0, void 0, function* () {

    yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.ddr_lambeei();
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_getMaintenanceMode', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_conetem = yield _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_esganes();
    const ddr_redunde = yield _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_domacao();
    ddr_valias({ status: true, data: { ddr_conetem, ddr_redunde } });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_setMaintenanceAcknowledge', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    yield _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_ementem(true);
    ddr_valias({ status: true, data: { ddr_redunde: true } });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_searchProduct', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_tools_bg_ddr_bafais/* .ddr_enojado */ .rh)(_tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_farda, "actions/json/product", ddr_alicio, ddr_valias, { ttl: _tools_bg_ddr_bafais/* .ddr_gripou */ .ns });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendMonitoring', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_tools_bg_ddr_bafais/* .ddr_enojado */ .rh)(_tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_pasmar, "barraextensao/monitora_produto", ddr_alicio, ddr_valias, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendReportComp', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_tools_bg_ddr_bafais/* .ddr_enojado */ .rh)(_tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome, "barraextensao/erro_comparacao", ddr_alicio, ddr_valias, { ttl: _tools_bg_ddr_bafais/* .ddr_roxeou */ .vZ });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendReportMenu', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    (0,_tools_bg_ddr_bafais/* .ddr_enojado */ .rh)(_tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome, "barraextensao/envia_erro", ddr_alicio, ddr_valias, { ttl: _tools_bg_ddr_bafais/* .ddr_roxeou */ .vZ });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_requestImage', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let ddr_fluir = ddr_alicio.ddr_fluir;
    if (ddr_fluir.indexOf('imgfile?key') < 0)
        ddr_fluir = yield _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_murem('imgfile', { url: ddr_fluir });
    const ddr_revelem = yield _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_farda(ddr_fluir, {}, { ttl: _tools_bg_ddr_bafais/* .ddr_minorem */ .EV });
    ddr_valias({ status: true, data: ddr_revelem });
}));


/***/ }),

/***/ 454:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const ddr_deixar = 5;
const ddr_encher = (ddr_finar) => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_testa(`ddr_premi:${ddr_finar}`);
};
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('setup-checkout-data', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_podei, ddr_obrei } = ddr_alicio;
    // getting the checkout entry for this store
    const ddr_tinjas = ddr_encher(ddr_podei);
    // retrieving the data
    let ddr_conga = yield ddr_tinjas.ddr_farda();
    // if there are stored coupons
    if (ddr_conga === null || ddr_conga === void 0 ? void 0 : ddr_conga.ddr_obrei) {
        // updating the incoming coupons with the stored result, if any
        ddr_obrei.forEach((ddr_soros) => {
            const ddr_module = ddr_conga.ddr_obrei.find(ddr_cascas => ddr_cascas.id == ddr_soros.id);
            if (ddr_module)
                ddr_soros.ddr_troca = ddr_module.ddr_troca;
        });
    }
    // updating the stored data
    ddr_conga = yield ddr_tinjas.ddr_afino({ ddr_obrei, ddr_sugara: false }, ddr_deixar, {});
    // returning it
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_jurar', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_podei, ddr_puxam } = ddr_alicio;
    const ddr_tinjas = ddr_encher(ddr_podei);
    const ddr_conga = yield ddr_tinjas.ddr_afino({ ddr_dragai: true, ddr_puxam }, ddr_deixar, {});
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_setCouponTesting', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_podei, ddr_ceada } = ddr_alicio;
    const ddr_tinjas = ddr_encher(ddr_podei);
    const ddr_conga = yield ddr_tinjas.ddr_farda({});
    ddr_conga.ddr_obrei = ddr_conga.ddr_obrei || [];
    ddr_conga.ddr_escuse = ddr_ceada;
    yield ddr_tinjas.ddr_enoje(ddr_conga);
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_setCouponTested', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_podei, ddr_ceada, ddr_acume } = ddr_alicio;
    const ddr_tinjas = ddr_encher(ddr_podei);
    const ddr_conga = yield ddr_tinjas.ddr_farda({});
    ddr_conga.ddr_obrei = ddr_conga.ddr_obrei || [];
    const ddr_fitada = ddr_conga.ddr_obrei.find(ddr_soros => ddr_soros.id == ddr_ceada);
    if (ddr_fitada)
        ddr_fitada.ddr_troca = ddr_acume;
    ddr_conga.ddr_escuse = 0;
    let max_result = 0;
    const ddr_duche = ddr_conga.ddr_obrei.filter(ddr_soros => ddr_soros.ddr_troca).map(ddr_soros => ddr_soros.ddr_troca);
    if (ddr_duche.length)
        max_result = Math.max(...ddr_duche);
    if (!ddr_conga.ddr_puxam)
        ddr_conga.ddr_puxam = max_result;
    const ddr_minga = ddr_conga.ddr_obrei.filter(ddr_soros => ddr_conga.ddr_puxam - ddr_soros.ddr_troca >= 1);
    ddr_minga.sort((a, b) => a.ddr_troca - b.ddr_troca);
    ddr_conga.ddr_enfear = ddr_minga[0];
    yield ddr_tinjas.ddr_enoje(ddr_conga);
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('set-best-applied', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    ddr_acenas(ddr_alicio, { ddr_sugara: true, ddr_pizas: ddr_alicio.ddr_pizas }, ddr_valias);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('stop-checkout', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    ddr_acenas(ddr_alicio, { ddr_escoa: true }, ddr_valias);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_murando', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_podei } = ddr_alicio;
    const ddr_tinjas = ddr_encher(ddr_podei);
    const ddr_conga = yield ddr_tinjas.ddr_farda({});
    ddr_conga.ddr_obrei = ddr_conga.ddr_obrei || [];
    ddr_conga.ddr_obrei.forEach(ddr_soros => delete ddr_soros.ddr_troca);
    delete ddr_conga.ddr_enfear;
    delete ddr_conga.ddr_sugara;
    ddr_conga.ddr_escoa = false;
    ddr_conga.ddr_renda = false;
    ddr_conga.ddr_escuse = 0;
    ddr_conga.ddr_dragai = false;
    yield ddr_tinjas.ddr_enoje(ddr_conga);
    ddr_valias({ status: true, data: ddr_conga });
}));
const ddr_acenas = (ddr_alicio, ddr_irmane, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_podei } = ddr_alicio;
    const ddr_tinjas = ddr_encher(ddr_podei);
    let ddr_conga = yield ddr_tinjas.ddr_farda({});
    ddr_conga = yield ddr_tinjas.ddr_afino(ddr_irmane, ddr_deixar, {});
    ddr_valias({ status: true, data: ddr_conga });
});


/***/ }),

/***/ 271:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_amacio: () => (/* binding */ ddr_amacio)
/* harmony export */ });
/* harmony import */ var _bg_ddr_gaspeai = __webpack_require__(96);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(585);
/* harmony import */ var _bg_ddr_calice = __webpack_require__(583);
/* harmony import */ var _tools_bg_ddr_latina = __webpack_require__(516);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/// <reference types="chrome"/>




const ddr_amacio = (ddr_valias, ddr_afonia) => {
    return new Promise(ddr_repus => {
        _tools_bg_ddr_latina/* ["default"] */ .Ay.ddr_farda("barraextensao/ofertas_disponiveis", null, { ttl: _tools_bg_ddr_latina/* .ddr_gripou */ .ns, purge: ddr_afonia }).then(ddr_boste => {
            const ddr_troca = { status: true, data: ddr_boste };
            if (ddr_valias)
                ddr_valias(ddr_troca);
            ddr_repus(ddr_troca);
        }).catch(ddr_tendes => {
            const ddr_troca = { status: false, error: ddr_tendes };
            if (ddr_valias)
                ddr_valias(ddr_troca);
            ddr_repus(ddr_troca);
        });
    });
};
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_getCoupons', (ddr_alicio, ddr_povoem, ddr_valias) => {
    ddr_amacio(ddr_valias);
});
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('ddr_boroa', (ddr_alicio, ddr_povoem, ddr_valias) => {
    ddr_amacio(ddr_valias, true);
});
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_clickCoupon', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_foros, ddr_remocou } = ddr_alicio;

    const ddr_errata = true;
    const ddr_porteis = ddr_foros.forcetrack;
    const ddr_manado = [];
    ddr_manado.push((0,_bg_ddr_gaspeai.ddr_defesas)('cupomlist', { action: 'clickcupom', storeseo: ddr_remocou, code: ddr_foros.codigo, cid: ddr_foros.id }, ddr_povoem));
    ddr_manado.push((0,_bg_ddr_calice.ddr_arrelva)(ddr_foros.idloja, ddr_foros.link, 'coupons', ddr_errata, ddr_porteis));
    yield Promise.all(ddr_manado);
    ddr_valias({ status: true });
}));


/***/ }),

/***/ 467:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
/// <reference types="chrome"/>



const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('reload', (ddr_alicio, ddr_povoem, ddr_valias) => {
    _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_estupor().then(() => {
        ddr_valias({ status: true });
        ddr_fertil.runtime.reload();
    });
});


/***/ }),

/***/ 31:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('set-draggable-pos', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_vibram = ddr_alicio.ddr_vibram;
    ddr_alicio.ddr_mesure = Date.now();
    const ddr_conga = yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_enoje('bubble-pos-' + ddr_vibram, ddr_alicio);
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('get-draggable-pos', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_vibram = ddr_alicio.ddr_vibram;
    const ddr_conga = yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda('bubble-pos-' + ddr_vibram);
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_cacoai', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_obsto('bubble-pos-bubble');
    ddr_valias({ status: true });
}));


/***/ }),

/***/ 862:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _bg_stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(164);
/* harmony import */ var _tools_bg_ddr_passai = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





// MEMCACHE
const ddr_breio = (ddr_miguem) => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.ddr_testa(`flow:${ddr_miguem}`);
};
// APPEND
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_appendFlowLocation', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let { ddr_podei, ddr_incha } = ddr_alicio;
    ddr_usado(ddr_podei, 'loc', ddr_incha).then(ddr_valias);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_appendFlowAction', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let { ddr_podei, ddr_orava, ddr_dento } = ddr_alicio;
    const ddr_incha = [ddr_orava, ddr_dento].filter(ddr_vales => ddr_vales).join(':');
    ddr_usado(ddr_podei, 'act', ddr_incha).then(ddr_valias);
}));
const ddr_vedei = [];
let ddr_morem = false;
const ddr_lixar = () => __awaiter(void 0, void 0, void 0, function* () {
    if (ddr_morem)
        return;
    if (!ddr_vedei.length)
        return;
    ddr_morem = true;
    const ddr_odiai = ddr_vedei.shift();
    const { ddr_urjas, ddr_rixei } = ddr_odiai;
    const { ddr_miguem, ddr_etanol, ddr_ginga } = ddr_urjas;
    const ddr_prega = yield ddr_zumbi(ddr_miguem);
    if (!ddr_prega) {
        ddr_rixei({ status: false });
        return;
    }
    const ddr_gemou = ddr_breio(ddr_miguem);
    const ddr_latis = yield ddr_gemou.ddr_farda([]);
    const ddr_pores = Math.floor(new Date().getTime() / 1000);
    const ddr_ponho = { ts: ddr_pores, type: ddr_etanol, value: ddr_ginga };
    ddr_latis.push(ddr_ponho);
    let ddr_cisco = ddr_latis.length - 1;
    let ddr_ereta = 0;
    const ddr_tecei = 50;
    const ddr_gesta = [];
    while (ddr_cisco >= 0 && ddr_ereta < ddr_tecei) {
        var ddr_vales = ddr_latis[ddr_cisco];
        if (ddr_vales.type == 'loc')
            ddr_ereta++;
        ddr_gesta.unshift(ddr_vales);
        ddr_cisco--;
    }
    yield ddr_gemou.ddr_enoje(ddr_gesta);
    ddr_morem = false;
    ddr_rixei({ status: true, ddr_conga: ddr_gesta });
    ddr_lixar();
});
const ddr_usado = (ddr_miguem, ddr_etanol, ddr_ginga) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise(ddr_repus => {
        ddr_vedei.push({ ddr_urjas: { ddr_miguem, ddr_etanol, ddr_ginga }, ddr_rixei: ddr_repus });
        ddr_lixar();
    });
});
// SEND
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendFlow', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let { ddr_podei, ddr_verde } = ddr_alicio;
    const ddr_surra = yield ddr_trata(ddr_podei, ddr_verde);
    ddr_valias({ status: true, ddr_conga: ddr_surra });
}));
const ddr_trata = (ddr_miguem, ddr_praca) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_gemou = ddr_breio(ddr_miguem);
    const ddr_latis = yield ddr_gemou.ddr_farda();
    const ddr_barcos = {
        store_id: ddr_miguem,
        flow: btoa(JSON.stringify(ddr_latis)),
        values: btoa(JSON.stringify(ddr_praca))
    };
    return yield _tools_bg_ddr_passai/* ["default"] */ .Ay.ddr_assome('barraextensao/corrente', ddr_barcos, { ttl: _tools_bg_ddr_passai/* .ddr_bascas */ .gW });
});
// MISC
const ddr_zumbi = (ddr_miguem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ddr_gozos = yield (0,_bg_stores__WEBPACK_IMPORTED_MODULE_1__.ddr_amovi)(ddr_miguem);
    const ddr_mugia = (_a = ddr_gozos === null || ddr_gozos === void 0 ? void 0 : ddr_gozos.flow) === null || _a === void 0 ? void 0 : _a.ativo;
    return ddr_mugia;
});


/***/ }),

/***/ 179:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tools_bg_ddr_tapado = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;

ddr_fertil.runtime.onInstalled.addListener((ddr_foquem) => __awaiter(void 0, void 0, void 0, function* () {

    const ddr_vadiai = yield _tools_bg_ddr_tapado/* ["default"] */ .Ay.ddr_murem('plugin-instalado');
    var isInflue = !ddr_vadiai || ddr_vadiai.indexOf("influesolutions") >= 0;
    if (!isInflue) {
        if (ddr_foquem.reason === 'install') {
            ddr_fertil.tabs.create({ url: ddr_vadiai });
        }
        const ddr_ninhal = yield _tools_bg_ddr_tapado/* ["default"] */ .Ay.ddr_murem('plugin-desinstalado');
        ddr_fertil.runtime.setUninstallURL(ddr_ninhal);
    }
    const ddr_nitral = ddr_fertil.runtime.getManifest().version;
    let ddr_trouxa = yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda('ddr_trouxa', []);
    ddr_trouxa = ddr_trouxa.filter(item => item.ddr_nitral !== ddr_nitral);
    ddr_trouxa.push({ ddr_nitral, ddr_ligado: ddr_foquem.previousVersion, ddr_pareio: Date.now() });
    yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_enoje('ddr_trouxa', ddr_trouxa);

}));


/***/ }),

/***/ 585:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sQ: () => (/* binding */ ddr_seteei),
/* harmony export */   wR: () => (/* binding */ ddr_ataste)
/* harmony export */ });
/* unused harmony export ddr_freno */
/// <reference types="chrome"/>
const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;
const ddr_amouca = [];
const ddr_seteei = (ddr_resma, ddr_fundo) => {
    ddr_amouca.push({ ddr_resma, ddr_fundo });
};
ddr_fertil.runtime.onMessage.addListener(function (ddr_alicio, ddr_povoem, ddr_valias) {
    const ddr_sucedi = ddr_amouca.filter(ddr_chupes => ddr_chupes.ddr_resma == ddr_alicio.event);
    if (ddr_sucedi.length) {
        ddr_sucedi.forEach(ddr_morres => ddr_morres.ddr_fundo(ddr_alicio, ddr_povoem, ddr_valias));
        return true;
    }

    return true;
});
const ddr_ataste = (ddr_resma, ddr_boste) => {
    ddr_fertil.tabs.query({}, function (ddr_atrios) {
        ddr_atrios.forEach(function (ddr_cacem) {
            if (ddr_cacem.id)
                ddr_freno(ddr_cacem.id, ddr_resma, ddr_boste);
        });
    });
};
const ddr_freno = (ddr_condal, ddr_resma, ddr_boste) => {
    try {
        ddr_fertil.tabs.sendMessage(ddr_condal, { event: ddr_resma, data: ddr_boste }, ddr_torax => {
            if (ddr_fertil.runtime.lastError) {

            }
        });
    }
    catch (ddr_valiam) {
    }
};


/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_franza: () => (/* binding */ ddr_franza)
/* harmony export */ });
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_ddr_bafais = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;
// LOGIN FLOW
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('log-in', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/entrar", ddr_alicio, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_torax => {
        ddr_branco(ddr_torax).then(ddr_valias);
    }).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('login-google', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    ddr_atinas().then(ddr_torax => {
        ddr_branco(ddr_torax).then(ddr_valias);
    }).catch(ddr_tendes => {
        ddr_valias({ status: false, error: (ddr_tendes === null || ddr_tendes === void 0 ? void 0 : ddr_tendes.message) || ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_signIn', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/cadastro", ddr_alicio, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_valias).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('confirm-email', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/confirma", ddr_alicio, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_torax => {
        ddr_branco(ddr_torax).then(ddr_valias);
    }).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('forgot-password', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/esqueci", ddr_alicio, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_valias);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('reset-password', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/recuperar", ddr_alicio, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_torax => {
        ddr_branco(ddr_torax).then(ddr_valias);
    }).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
// PROFILE
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('get-profile', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    ddr_ativou().then(ddr_domara => ddr_valias({ status: !!ddr_domara, data: ddr_domara }));
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('get-monitors', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_oporas("actions/json/monitors").then(ddr_torax => {
        ddr_valias({ status: true, data: ddr_torax });
    }).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('update-monitor', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_pasmar("barraextensao/monitora_produto", ddr_alicio).then(ddr_torax => {
        ddr_valias({ status: true, data: ddr_torax });
    }).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('set-my-data', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_pasmar("barraextensao/atualiza_dados", ddr_alicio).then(ddr_branco).then(ddr_valias);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('change-password', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_pasmar("barraextensao/atualiza_senha", ddr_alicio).then(ddr_valias).catch(ddr_tendes => {
        ddr_valias({ status: false, error: ddr_tendes });
    });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('log-out', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_farda("barraextensao/sair", null, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_saxoes).then(ddr_valias);
}));
const ddr_atinas = () => {
    const ddr_prezes = ddr_fertil.identity.getRedirectURL('oauth2');
    const ddr_maluco = ["openid", "email", "profile"];
    let ddr_amumie = "https://accounts.google.com/o/oauth2/auth";
    ddr_amumie += `?client_id=772371977576-fj91vkav6js7oulbsga2md54ise5vp4b.apps.googleusercontent.com`;
    ddr_amumie += `&response_type=token`;
    ddr_amumie += `&prompt=select_account`;
    ddr_amumie += `&redirect_uri=${encodeURIComponent(ddr_prezes)}`;
    ddr_amumie += `&scope=${encodeURIComponent(ddr_maluco.join(' '))}`;
    return new Promise((ddr_repus, ddr_proso) => {
        ddr_fertil.identity.launchWebAuthFlow({ interactive: true, url: ddr_amumie }, ddr_coaxe => {
            var _a;
            const ddr_boiava = ddr_coaxe === null || ddr_coaxe === void 0 ? void 0 : ddr_coaxe.split('#')[1];
            const ddr_voaras = (_a = ddr_boiava === null || ddr_boiava === void 0 ? void 0 : ddr_boiava.split('&')[0]) === null || _a === void 0 ? void 0 : _a.split('=')[1];
            _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/googletoken", { token: ddr_voaras }, { ttl: _tools_bg_ddr_bafais/* .ddr_gemada */ .LP }).then(ddr_repus).catch(ddr_proso);
        });
    });
};
const ddr_ativou = () => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.ddr_farda('profile');
};
const ddr_franza = () => __awaiter(void 0, void 0, void 0, function* () {
    const p = yield ddr_ativou();
    return p ? p.id + ':' + p.userhash : '';
});
const ddr_peleis = (ddr_ginga) => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.ddr_enoje('profile', ddr_ginga);
};
const ddr_saxoes = () => __awaiter(void 0, void 0, void 0, function* () {
    yield _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.ddr_obsto('profile');
    return { status: true };
});
const ddr_branco = (ddr_torax) => {
    return new Promise(resolve => {
        if (!ddr_torax.status || !ddr_torax.profile)
            return resolve(ddr_torax);
        const ddr_sextas = ddr_torax.profile;
        ddr_peleis(ddr_sextas).then(() => {
            resolve({ status: true, data: ddr_sextas });
        });
    });
};


/***/ }),

/***/ 358:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_espero: () => (/* binding */ ddr_espero),
/* harmony export */   ddr_afinfai: () => (/* binding */ ddr_afinfai)
/* harmony export */ });
/* harmony import */ var _bg_coupons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(271);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(585);
/* harmony import */ var _bg_ddr_incise = __webpack_require__(591);
/* harmony import */ var _bg_ddr_vetava = __webpack_require__(583);
/* harmony import */ var _tools_bg_ddr_inveje = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(495);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;







const ddr_azulas = 15 * 60 * 1000; // 15 minutes
const ddr_servios = 10 * 60 * 1000; // 10 minutes
const ddr_frenava = 30 * 60 * 1000; // 30 minutes
const ddr_iguano = 30 * 60 * 1000; // 30 minutes
const ddr_totais = 60; // in seconds
const ddr_calcou = false;
ddr_fertil.runtime.onStartup.addListener(() => __awaiter(void 0, void 0, void 0, function* () {

    yield ddr_afinfai();
}));
ddr_fertil.runtime.onInstalled.addListener(() => __awaiter(void 0, void 0, void 0, function* () {

    yield ddr_erigido();
}));
// CACHE PUSH
const ddr_danador = () => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.ddr_testa('ddr_foques');
};
const ddr_cogito = () => {
    const ddr_ponho = ddr_danador();
    return ddr_ponho.ddr_farda({});
};
const ddr_anulas = (ddr_boste) => {

    const ddr_ponho = ddr_danador();
    return ddr_ponho.ddr_enoje(ddr_boste);
};
const ddr_lascou = (ddr_mamou) => {

    (0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_ataste */ .wR)('bg_pushDone', { ddr_vibram: ddr_mamou });
};
const ddr_turbina = (ddr_mamou) => __awaiter(void 0, void 0, void 0, function* () {

    const ddr_conga = yield ddr_cogito();
    if (ddr_conga[ddr_mamou])
        ddr_conga[ddr_mamou].ddr_formem = true;
    yield ddr_afinfai(ddr_conga);
});
const ddr_afinfai = (ddr_boste) => __awaiter(void 0, void 0, void 0, function* () {

    if (!ddr_boste)
        ddr_boste = yield ddr_cogito();
    Object.keys(ddr_boste).forEach(ddr_vibram => {
        const ddr_limpar = ddr_boste === null || ddr_boste === void 0 ? void 0 : ddr_boste[ddr_vibram];
        if (ddr_limpar && !(ddr_limpar === null || ddr_limpar === void 0 ? void 0 : ddr_limpar.ddr_formem)) {

            ddr_limpar.ddr_voeja = Date.now();
        }
    });
    yield ddr_anulas(ddr_boste);
});
const ddr_erigido = (ddr_soros = false) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_vazio = ddr_soros ? 'ddr_pretas' : 'ddr_dolares';
    const ddr_ermos = ddr_soros ? ddr_iguano : Math.floor(Math.random() * (ddr_frenava - ddr_servios)) + ddr_servios;
    const ddr_voeja = Date.now() + ddr_ermos;
    _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.ddr_enoje(ddr_vazio, ddr_voeja);
});
const ddr_trajem = (ddr_soros = false) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_vazio = ddr_soros ? 'ddr_pretas' : 'ddr_dolares';
    _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.ddr_enoje(ddr_vazio, 0);
});
const ddr_pregara = (ddr_soros = false) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_vazio = ddr_soros ? 'ddr_pretas' : 'ddr_dolares';
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.ddr_farda(ddr_vazio);
});
// CACHE PUSH/COUPONS
const ddr_abolis = () => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A.ddr_testa('ddr_acenem');
};
const ddr_espero = () => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_ponho = ddr_abolis();
    const ddr_conga = yield ddr_ponho.ddr_farda({});
    if (!ddr_conga.ddr_grafar)
        ddr_conga.ddr_grafar = { ddr_forno: false, ddr_defiro: 0, ddr_atuem: {} };
    if (!ddr_conga.ddr_tombar)
        ddr_conga.ddr_tombar = {};
    return ddr_conga;
});
const ddr_axilas = (ddr_boste) => {

    const ddr_ponho = ddr_abolis();
    return ddr_ponho.ddr_enoje(ddr_boste);
};
const ddr_ararem = (ddr_miguem, ddr_tonado) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_conga = yield ddr_espero();
    ddr_conga.ddr_tombar[ddr_miguem] = ddr_tonado;
    yield ddr_axilas(ddr_conga);
    yield ddr_erigido(true);
});
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_getPushs', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { ddr_apraza } = ddr_alicio;
    const ddr_frouxas = yield ddr_pregara();
    const ddr_piche = Date.now();
    // gettting the config/data for push/coupons
    const ddr_sondai = yield ddr_espero();
    // preparing a basic result
    const ddr_troca = { status: true, data: { ddr_foques: [], ddr_limpar: null, ddr_sondai } };
    // preventing pushes from being displayed right at the start of the browser execution or after another push just happened
    // we check "!delayed" here because if the var is not set it probably means we just started the addon, so lets NOT show anything
    if (!ddr_apraza && (!ddr_frouxas || ddr_piche < ddr_frouxas))
        return ddr_valias(ddr_troca);
    // requesting the push list
    const ddr_incisa = yield ddr_glorie();
    // if something went wrong, stop here and return the error
    if (!ddr_incisa.status)
        return ddr_valias(Object.assign(Object.assign({}, ddr_troca), ddr_incisa));
    // if there is an active push to show, return it
    if (ddr_incisa.data.ddr_limpar) {
        ddr_troca.data = Object.assign(Object.assign({}, ddr_troca.data), ddr_incisa.data);
        return ddr_valias(ddr_troca);
    }
    if (!ddr_calcou)
        return ddr_valias(ddr_troca);
    // if there is no active push, let's check for a push/coupon
    // but here we assume the whole flow is already in place, so we'll only prevent push/cupons if it's actually delayed (by another push/coupon)
    const ddr_louram = yield ddr_pregara(true);
    if (ddr_louram && ddr_piche < ddr_louram)
        return ddr_valias(ddr_troca);
    // first we get all coupons
    const ddr_obrei = (_b = (_a = (yield (0,_bg_coupons__WEBPACK_IMPORTED_MODULE_0__.ddr_amacio)()).data) === null || _a === void 0 ? void 0 : _a.cupons) === null || _b === void 0 ? void 0 : _b.filter(ddr_fitada => ddr_fitada.codigo);
    const ddr_rixais = ddr_sondai.ddr_grafar;
    // if we never had a push run this flow before, we cant really check for ids, to lets store the current state and call it done
    if (!Object.keys(ddr_sondai.ddr_tombar).length) {
        // getting the last id by store
        ddr_obrei === null || ddr_obrei === void 0 ? void 0 : ddr_obrei.forEach(ddr_fitada => {
            const ddr_tombar = ddr_sondai.ddr_tombar[ddr_fitada.idloja] || 0;
            ddr_sondai.ddr_tombar[ddr_fitada.idloja] = Math.max(ddr_fitada.id, ddr_tombar);
        });
        // storing it on the cache

        yield ddr_axilas(ddr_sondai);
        // returning an empty result
        return ddr_valias(ddr_troca);
    }
    // filtering to keep only new coupons
    const ddr_voguei = (ddr_obrei === null || ddr_obrei === void 0 ? void 0 : ddr_obrei.filter(ddr_fitada => {
        // if this coupon is newer than whatever we had last, return it
        const ddr_tombar = ddr_sondai.ddr_tombar[ddr_fitada.idloja];
        return ddr_tombar && ddr_fitada.id > ddr_tombar;
    })) || [];

    if (!ddr_voguei.length)
        return ddr_valias(ddr_troca);
    // filtering based on user muted settings
    const ddr_enrola = ddr_voguei.filter(ddr_fitada => {
        var _a;
        // assuming it's not muted by default
        let ddr_folhem = 0;
        // if it's muted for all stores, get the expiration date
        if (ddr_rixais.ddr_forno)
            ddr_folhem = ddr_rixais.ddr_defiro;
        else {
            // if it's muted for this store, get the expiration date for it
            const ddr_atedie = (_a = ddr_rixais.ddr_atuem) === null || _a === void 0 ? void 0 : _a[ddr_fitada.idloja];
            if (ddr_atedie)
                ddr_folhem = ddr_atedie;
        }
        // if it's muted indefinitely, return false
        if (ddr_folhem < 0)
            return false;
        // if it's muted until a future date, return false
        if (ddr_folhem && ddr_folhem > Date.now())
            return false;
        // otherwise, return true
        return true;
    });

    // if there is none, return an empty result
    if (!ddr_enrola.length)
        return ddr_valias(ddr_troca);
    // grouping them by store
    const ddr_distal = {};
    ddr_enrola.forEach(ddr_fitada => {
        if (!ddr_distal[ddr_fitada.idloja])
            ddr_distal[ddr_fitada.idloja] = { ddr_rendou: ddr_fitada.nomeloja, ddr_eleger: 0 };
        ddr_distal[ddr_fitada.idloja].ddr_eleger++;
    });
    const ddr_modais = Object.values(ddr_distal);

    const ddr_tossem = [
        'Cupons Fresquinhos!',
        'Novos Cupons!',
        'Corre que tem cupom!',
        'Pegue seu cupom!',
    ];
    const ddr_baniu = ddr_enrola.length % ddr_tossem.length;
    const ddr_darei = ddr_tossem[ddr_baniu];
    // then we return it 'as a push'
    const ddr_limpar = {
        code: "pushcoupon_resume",
        titulo: ddr_darei,
        autotrack: 1,
        duration: ddr_totais,
        corfundo: "#FFFFFF",
        ddr_formem: false,
        ddr_cacoo: true,
        ddr_voeja: Date.now(),
        ddr_fitada: true,
        ddr_modais
    };
    ddr_troca.data.ddr_limpar = ddr_limpar;
    return ddr_valias(ddr_troca);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_resetOneStorePushCoupon', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const ddr_sondai = yield ddr_espero();
    const ddr_pascal = Object.keys(ddr_sondai.ddr_tombar);
    if (ddr_pascal.length) {
        const ddr_sancao = ddr_pascal[Math.floor(Math.random() * ddr_pascal.length)];

        ddr_sondai.ddr_tombar[parseInt(ddr_sancao)] = 1;
        yield ddr_axilas(ddr_sondai);
        yield ddr_trajem(true);
    }
    ddr_valias({ status: true });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_sendMute', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_ericas, ddr_calvem } = ddr_alicio;
    const ddr_sondai = yield ddr_espero();
    const ddr_defiro = ddr_calvem < 0 ? -1 : Date.now() + ddr_calvem * 60 * 60 * 1000;
    if (ddr_ericas < 0) {
        ddr_sondai.ddr_grafar.ddr_forno = true;
        ddr_sondai.ddr_grafar.ddr_defiro = ddr_defiro;
    }
    else {
        if (!ddr_sondai.ddr_grafar.ddr_atuem)
            ddr_sondai.ddr_grafar.ddr_atuem = {};
        ddr_sondai.ddr_grafar.ddr_atuem[ddr_ericas] = ddr_defiro;
    }
    yield ddr_erigido(true);
    yield ddr_axilas(ddr_sondai);
    return ddr_valias({ status: true, data: { ddr_sondai } });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_sendUnmute', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_ericas } = ddr_alicio;
    const ddr_sondai = yield ddr_espero();
    if (ddr_ericas < 0) {
        ddr_sondai.ddr_grafar.ddr_forno = false;
        ddr_sondai.ddr_grafar.ddr_defiro = 0;
    }
    else {
        if (ddr_sondai.ddr_grafar.ddr_atuem)
            delete ddr_sondai.ddr_grafar.ddr_atuem[ddr_ericas];
    }
    yield ddr_axilas(ddr_sondai);
    return ddr_valias({ status: true, data: { ddr_sondai } });
}));
const ddr_glorie = () => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_iguala = yield (0,_bg_ddr_incise.ddr_acamai)();
    const silenciado = ddr_iguala.ddr_rosnes ? 1 : 0;
    return new Promise(ddr_repus => {
        _tools_bg_ddr_inveje/* ["default"] */ .Ay.ddr_farda("barraextensao/push", { silenciado }, { ttl: _tools_bg_ddr_inveje/* .ddr_gripou */ .ns }).then((ddr_foques) => __awaiter(void 0, void 0, void 0, function* () {
            const ddr_ditava = yield ddr_cogito();
            let any_changes = false;
            ddr_foques.forEach(ddr_limpar => {
                const ddr_vibram = ddr_limpar.code;
                if (!ddr_ditava[ddr_vibram]) {
                    ddr_ditava[ddr_vibram] = { ddr_voeja: Date.now(), ddr_formem: false };
                    any_changes = true;
                }
                ddr_limpar.ddr_formem = ddr_ditava[ddr_vibram].ddr_formem;
                ddr_limpar.ddr_voeja = ddr_ditava[ddr_vibram].ddr_voeja;
                let ddr_odeiam = ddr_limpar.ddr_voeja + ddr_azulas;
                if (ddr_iguala.ddr_rosnes)
                    ddr_odeiam = ddr_iguala.ddr_rosnes;
                const ddr_ejetem = ddr_odeiam - Date.now();
                ddr_limpar.ddr_cacoo = ddr_ejetem < 0;
            });
            if (any_changes)
                yield ddr_anulas(ddr_ditava);
            const ddr_limpar = ddr_foques.find(ddr_limpar => !ddr_limpar.ddr_formem && ddr_limpar.ddr_cacoo);
            ddr_repus({ status: true, data: { ddr_foques, ddr_limpar } });
        })).catch(ddr_tendes => {
            ddr_repus({ status: false, error: ddr_tendes });
        });
    });
});
// SEND
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_sendPushView', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_vibram, ddr_fitada } = ddr_alicio;
    if (!ddr_fitada)
        yield ddr_capitao(ddr_vibram, 'view');
    ddr_valias({ status: true });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_sendPushClick', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_ceada, ddr_vibram, ddr_podei, ddr_fitada, ddr_fluir } = ddr_alicio;
    if (ddr_fitada) {
        yield ddr_ararem(ddr_podei, ddr_ceada);
    }
    else {
        ddr_fertil.tabs.create({ url: ddr_fluir, active: true }, tab => { }); // não é necessário trackear os pushs porque a url já vem trackeada
        yield ddr_turbina(ddr_vibram);
        yield ddr_capitao(ddr_vibram, 'click');
    }
    ddr_lascou(ddr_vibram);
    if (ddr_podei)
        yield (0,_bg_ddr_vetava.ddr_aticai)(ddr_podei, 'push');
    ddr_valias({ status: true });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_1__/* .ddr_seteei */ .sQ)('bg_sendPushClose', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_ceada, ddr_vibram, ddr_podei, ddr_fitada } = ddr_alicio;
    if (ddr_fitada) {
        yield ddr_ararem(ddr_podei, ddr_ceada);
    }
    else {
        yield ddr_turbina(ddr_vibram);
        yield ddr_capitao(ddr_vibram, 'close');
    }
    ddr_lascou(ddr_vibram);
    ddr_valias({ status: true });
}));
const ddr_capitao = (ddr_mamou, ddr_fundo) => {

    return new Promise(ddr_acenei => {
        _tools_bg_ddr_inveje/* ["default"] */ .Ay.ddr_assome("barraextensao/envia_push", { code: ddr_mamou, type: ddr_fundo }, { ttl: _tools_bg_ddr_inveje/* .ddr_bojava */ .cu }).then(ddr_troca => {

            ddr_acenei({ status: true });
        }).catch(ddr_tendes => {

            ddr_acenei({ status: false, error: ddr_tendes });
        });
    });
};


/***/ }),

/***/ 838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _bg_ddr_sagrava = __webpack_require__(583);
/* harmony import */ var _tools_bg_ddr_passai = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const services_cache = () => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.ddr_testa('ddr_bodas');
};
const services_get = () => {
    const ddr_ponho = services_cache();
    return ddr_ponho.ddr_farda([]);
};
const services_set = (ddr_boste) => {

    const ddr_ponho = services_cache();
    return ddr_ponho.ddr_enoje(ddr_boste);
};
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_getServices', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    delete ddr_alicio.event;
    (0,_tools_bg_ddr_passai/* .ddr_enojado */ .rh)(_tools_bg_ddr_passai/* ["default"] */ .Ay.ddr_farda, "barraextensao/ofertasservicos", ddr_alicio, ddr_valias, { ttl: _tools_bg_ddr_passai/* .ddr_gripou */ .ns });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendServiceView', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_goleia } = ddr_alicio;
    const ddr_bodas = yield services_get();
    const ddr_mudarem = [...ddr_bodas, ...ddr_goleia];
    const ddr_perdoou = [...new Set(ddr_mudarem)];

    yield services_sendEvent(ddr_perdoou, 'view');
    yield services_set(ddr_perdoou);
    ddr_valias({ status: true });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendServiceClick', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_ceada, ddr_podei, ddr_fluir } = ddr_alicio;
    const ddr_manado = [];
    const ddr_errata = true;
    const ddr_porteis = true;
    ddr_manado.push((0,_bg_ddr_sagrava.ddr_arrelva)(ddr_podei, ddr_fluir, 'services', ddr_errata, ddr_porteis));
    ddr_manado.push(services_sendEvent([ddr_ceada], 'click'));
    yield Promise.all(ddr_manado);
    ddr_valias({ status: true });
}));
const services_sendEvent = (ddr_verdugo, ddr_etanol) => {

    return new Promise(ddr_acenei => {
        _tools_bg_ddr_passai/* ["default"] */ .Ay.ddr_assome("barraextensao/enviaservicos", { ids: ddr_verdugo, type: ddr_etanol }, { ttl: _tools_bg_ddr_passai/* .ddr_omitiu */ .VV }).then(ddr_troca => {

            ddr_acenei({ status: true });
        }).catch(ddr_tendes => {

            ddr_acenei({ status: false, error: ddr_tendes });
        });
    });
};


/***/ }),

/***/ 591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_acamai: () => (/* binding */ ddr_acamai)
/* harmony export */ });
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _bg_ddr_cedesse = __webpack_require__(358);
/* harmony import */ var _tools_bg_ddr_passai = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(495);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/// <reference types="chrome"/>





const ddr_versem = [
    'showServicesByDefault',
    'ddr_rosnes',
    'ddr_tracai'
];
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_molas', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_conga = yield ddr_acamai();
    yield ddr_palrou(ddr_conga, true);
    ddr_valias({ status: true, data: ddr_conga });
}));
const ddr_palrou = (ddr_boste, ddr_ficara) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_pascal = Object.keys(ddr_boste);
    const ddr_borrai = ddr_pascal.filter(ddr_vazio => !ddr_versem.includes(ddr_vazio));
    if (ddr_borrai.length) {
        ddr_borrai.forEach(ddr_vazio => delete ddr_boste[ddr_vazio]);
        if (ddr_ficara)
            yield ddr_surdiu(ddr_boste);
    }
});
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_orles', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    // applying whatever the user sent
    const ddr_conga = yield ddr_mareai(ddr_alicio);
    // parseing the silence dropdown
    if (ddr_alicio.ddr_torcao) {
        const ddr_atenue = ddr_acudou(ddr_alicio.ddr_torcao);
        if (ddr_atenue)
            ddr_conga.ddr_rosnes = ddr_atenue.getTime();
    }
    // parseing the silence checkbox
    if (!ddr_alicio.ddr_torcao && !ddr_alicio.ddr_aticei) {

        ddr_conga.ddr_rosnes = null;
        yield (0,_bg_ddr_cedesse.ddr_afinfai)();
    }
    // keeping only the settings we want
    ddr_palrou(ddr_conga, true);
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_rondar', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    yield ddr_mareai({ ddr_tracai: [] });
    ddr_valias({ status: true, data: { ddr_tracai: [] } });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_createNewLocalId', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_formado = yield _tools_bg_ddr_passai/* ["default"] */ .Ay.ddr_aferia();
    const ddr_tolha = yield _tools_bg_ddr_passai/* ["default"] */ .Ay.ddr_aferia(true);
    ddr_valias({ status: true, data: { ddr_formado, ddr_tolha } });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_editam', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_formem } = ddr_alicio;
    const ddr_conga = yield ddr_acamai();
    const ddr_tracai = ddr_conga.ddr_tracai || [];
    ddr_tracai.push(...ddr_formem);
    yield ddr_mareai({ ddr_tracai });
    ddr_valias({ status: true, data: { ddr_tracai } });
}));
const ddr_autuam = () => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.ddr_testa('ddr_iguala');
};
const ddr_acamai = () => {
    return ddr_autuam().ddr_farda({
        ddr_tracai: [],
        allowPushs: true,
        weeklyReport: true,
    });
};
const ddr_mareai = (ddr_gramei) => {
    return ddr_autuam().ddr_afino(ddr_gramei);
};
const ddr_surdiu = (ddr_gramei) => {
    return ddr_autuam().ddr_enoje(ddr_gramei);
};
const ddr_acudou = (ddr_ginga) => {
    const ddr_adento = /^(\d+)-([hdwmy])$/;
    const ddr_atice = ddr_ginga.match(ddr_adento);
    if (ddr_atice) {
        const ddr_incha = parseInt(ddr_atice[1]);
        const ddr_dates = ddr_atice[2];
        if (!isNaN(ddr_incha)) {
            const ddr_piche = new Date();
            let ddr_perene = new Date(ddr_piche);
            switch (ddr_dates) {
                case 'h': // hours
                    ddr_perene.setHours(ddr_piche.getHours() + ddr_incha);
                    break;
                case 'd': // days
                    ddr_perene.setDate(ddr_piche.getDate() + ddr_incha);
                    break;
                case 'w': // weeks
                    ddr_perene.setDate(ddr_piche.getDate() + ddr_incha * 7);
                    break;
                case 'm': // months
                    ddr_perene.setMonth(ddr_piche.getMonth() + ddr_incha);
                    break;
                case 'y': // years
                    ddr_perene.setFullYear(ddr_piche.getFullYear() + ddr_incha);
                    break;
                default:
                    return null; // Invalid duration type
            }
            return ddr_perene;
        }
    }
    return null; // Invalid input format
};


/***/ }),

/***/ 164:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_amovi: () => (/* binding */ ddr_amovi),
/* harmony export */   ddr_filho: () => (/* binding */ ddr_filho)
/* harmony export */ });
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_ddr_bafais = __webpack_require__(516);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('ddr_filho', (ddr_alicio, ddr_povoem, ddr_valias) => {
    ddr_filho().then(ddr_torax => {
        ddr_valias(ddr_torax);
    });
});
const ddr_filho = () => {
    return new Promise(ddr_acenei => {
        const ddr_amigou = parseInt('17');
        _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_farda("barraextensao/nossas_lojas", null, { ttl: _tools_bg_ddr_bafais/* .ddr_gripou */ .ns }).then((ddr_boste) => {
            const ddr_atuem = ddr_boste === null || ddr_boste === void 0 ? void 0 : ddr_boste.filter(ddr_rendou => {
                var _a, _b, _c;
                if (!((_a = ddr_rendou.labels) === null || _a === void 0 ? void 0 : _a.length))
                    return true;
                if ((_b = ddr_rendou.labels) === null || _b === void 0 ? void 0 : _b.includes(ddr_amigou))
                    return true;
                if ((_c = ddr_rendou.labels) === null || _c === void 0 ? void 0 : _c.includes(ddr_amigou.toString()))
                    return true;
                return false;
            });
            ddr_acenei({ status: true, data: ddr_atuem });
        }).catch(ddr_tendes => {
            ddr_acenei({ status: false, error: ddr_tendes });
        });
    });
};
const ddr_amovi = (ddr_miguem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ddr_atuem = yield ddr_filho();
    return (_a = ddr_atuem === null || ddr_atuem === void 0 ? void 0 : ddr_atuem.data) === null || _a === void 0 ? void 0 : _a.find(ddr_vales => ddr_vales.idloja == ddr_miguem);
});


/***/ }),

/***/ 77:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_ddr_bafais = __webpack_require__(516);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_registerUserCoupon', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {

    const { ddr_podei, ddr_beijara, ddr_aluviai } = ddr_alicio;
    _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/registrar_cupom", { idloja: ddr_podei, links: JSON.stringify(ddr_beijara), valores: ddr_aluviai }, { ttl: _tools_bg_ddr_bafais/* .ddr_omitiu */ .VV }).then(ddr_valias);
}));


/***/ }),

/***/ 96:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_defesas: () => (/* binding */ ddr_defesas)
/* harmony export */ });
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


let ddr_bojaria = 0;
let ddr_adagiou = 0;
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_sendGAevent', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    const { ddr_batam, ddr_urjas } = ddr_alicio;
    yield ddr_defesas(ddr_batam, ddr_urjas, ddr_povoem);
    ddr_valias({ status: true });
}));
const ddr_defesas = (ddr_resma, ddr_femoral, ddr_povoem) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    const ddr_afreto = await ddr_raleai.ddr_aferia();

    const ddr_coere = {
        "client_id": ddr_afreto,
        "events": [{
            "name": ddr_resma,
            "params": {
                ...ddr_femoral,
                "isxmode": ddr_doutrem,
                "isxversion": ddr_dislate
            }
        }]
    };

    const ddr_retal = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ddr_coere)
    };


    return new Promise<void>(ddr_repus => {
        const ddr_fluir = `https://events.influesolutions.com:83/addevent`;
        fetch(ddr_fluir, ddr_retal).then(() => { ddr_bojaria++; }).catch(() => { ddr_adagiou++; }).finally(ddr_repus);
    });
    */
});


/***/ }),

/***/ 583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ddr_arrelva: () => (/* binding */ ddr_arrelva),
/* harmony export */   ddr_aticai: () => (/* binding */ ddr_aticai)
/* harmony export */ });
/* harmony import */ var _bg_listeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(585);
/* harmony import */ var _tools_bg_ddr_bafais = __webpack_require__(516);
/* harmony import */ var _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(495);
/// <reference types="chrome"/>
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const ddr_fertil = (typeof browser != 'undefined') ? browser : chrome;

// VARS/CONFIG
const ddr_excite = 120;
const ddr_arpeai = {};
const ddr_lobado = ['testador-show', 'testador-success', 'cupomlist-show', 'product-show'];
const ddr_tampes = (ddr_miguem) => {
    return _tools_bg_memcache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.ddr_testa(`ddr_hirtos:${ddr_miguem}`);
};
// LISTENERS
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_trackGet', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let { ddr_podei } = ddr_alicio;
    const ddr_preves = ddr_tampes(ddr_podei);
    const ddr_conga = yield ddr_preves.ddr_farda();
    ddr_valias({ status: true, data: ddr_conga });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_trackUrlInactive', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let { ddr_podei, ddr_fluir, ddr_queije } = ddr_alicio;
    ddr_fluir = ddr_fluir || ddr_povoem.origin || ddr_povoem.url;
    ddr_arrelva(ddr_podei, ddr_fluir, ddr_queije, false, true).then(ddr_valias);
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_trackSetLoaded', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ddr_adeuso = ((_a = ddr_povoem.tab) === null || _a === void 0 ? void 0 : _a.id) || 0;
    ddr_arpeai[ddr_adeuso] = true;
    ddr_valias({ status: true });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_trackUrlPinned', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let { ddr_podei, ddr_fluir, ddr_queije } = ddr_alicio;
    ddr_fluir = ddr_fluir || ddr_povoem.origin || ddr_povoem.url;
    const ddr_conga = yield ddr_aticai(ddr_podei, ddr_queije);
    const ddr_dragai = yield ddr_baleie(ddr_podei, ddr_fluir, ddr_conga.ddr_queije);
    ddr_fertil.tabs.create({ url: ddr_dragai, active: true, pinned: true }, tab => {
        const ddr_adeuso = tab.id;
        let ddr_abeto = true;
        // every few seconds we'll check if the tab is loaded
        const ddr_missam = setInterval(() => {
            const ddr_travam = ddr_arpeai[ddr_adeuso];
            if (ddr_travam)
                ddr_loures();
        }, 500);
        // we'll wait, at most, 5 seconds for the tab to load
        const ddr_cisnes = setTimeout(() => {
            ddr_loures();
        }, 5 * 1000);
        // letting whoever is tracking that we're done
        const ddr_loures = () => {
            if (!ddr_abeto)
                return;
            clearInterval(ddr_missam);
            clearInterval(ddr_cisnes);
            ddr_abeto = false;
            ddr_valias({ status: true, data: ddr_conga });
        };
        // we'll close the tracking tab after 15 seconds.
        setTimeout(() => {
            try {
                ddr_fertil.tabs.remove(ddr_adeuso);
            }
            catch (e) { }
        }, 15 * 1000);
    });
    if ((_b = ddr_povoem.tab) === null || _b === void 0 ? void 0 : _b.id)
        chrome.tabs.update((_c = ddr_povoem.tab) === null || _c === void 0 ? void 0 : _c.id, { active: true }, () => { });
}));
(0,_bg_listeners__WEBPACK_IMPORTED_MODULE_0__/* .ddr_seteei */ .sQ)('bg_trackPostEvent', (ddr_alicio, ddr_povoem, ddr_valias) => __awaiter(void 0, void 0, void 0, function* () {
    let { ddr_podei, ddr_fluir, ddr_guaras } = ddr_alicio;
    ddr_fluir = ddr_fluir || ddr_povoem.origin || ddr_povoem.url;
    if (ddr_podei && ddr_lobado.includes(ddr_guaras)) {
        _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_assome("barraextensao/conta_evento", { idloja: ddr_podei, event: ddr_guaras, url: ddr_fluir }, { ttl: _tools_bg_ddr_bafais/* .ddr_omitiu */ .VV }).then(ddr_valias);
    }
    else {
        ddr_valias({ status: false });
    }
}));
// METHODS
const ddr_arrelva = (ddr_miguem, ddr_coaxe, ddr_toadas, ddr_projete, ddr_emulada) => {
    return new Promise((ddr_repus, ddr_proso) => __awaiter(void 0, void 0, void 0, function* () {
        const ddr_conga = yield ddr_aticai(ddr_miguem, ddr_toadas);
        let ddr_fluir = ddr_coaxe;
        if (ddr_emulada)
            ddr_fluir = yield ddr_baleie(ddr_miguem, ddr_coaxe, ddr_conga.ddr_queije);
        ddr_fertil.tabs.create({ url: ddr_fluir, active: ddr_projete }, tab => { });
        ddr_repus({ status: true, data: ddr_conga });
    }));
};
const ddr_aticai = (ddr_miguem, ddr_toadas) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_preves = ddr_tampes(ddr_miguem);
    let ddr_conga = yield ddr_preves.ddr_farda();
    if (!(ddr_conga === null || ddr_conga === void 0 ? void 0 : ddr_conga.ddr_queije)) {
        ddr_conga = yield ddr_preves.ddr_afino({ ddr_queije: ddr_toadas }, ddr_excite, {});
    }
    return ddr_conga;
});
const ddr_baleie = (ddr_miguem, ddr_coaxe, ddr_toadas) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ddr_toadas || ddr_toadas == 'undefined')
        ddr_toadas = 'padrao';
    return _tools_bg_ddr_bafais/* ["default"] */ .Ay.ddr_murem('tracking', { url: encodeURIComponent(ddr_coaxe), zorigem: 'm3' + ddr_toadas });
});


/***/ }),

/***/ 516:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ ddr_raleai),
/* harmony export */   EV: () => (/* binding */ ddr_minorem),
/* harmony export */   LP: () => (/* binding */ ddr_gemada),
/* harmony export */   VV: () => (/* binding */ ddr_omitiu),
/* harmony export */   cu: () => (/* binding */ ddr_bojava),
/* harmony export */   gW: () => (/* binding */ ddr_bascas),
/* harmony export */   ns: () => (/* binding */ ddr_gripou),
/* harmony export */   rh: () => (/* binding */ ddr_enojado),
/* harmony export */   vZ: () => (/* binding */ ddr_roxeou)
/* harmony export */ });
/* unused harmony exports ddr_doutrem, ddr_acateis, ddr_dislate */
/* harmony import */ var _bg_ddr_podado = __webpack_require__(941);
/* harmony import */ var _bg_memcache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(495);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;



const ddr_gemada = 0;
const ddr_roxeou = 10;
const ddr_omitiu = 10;
const ddr_bascas = 30;
const ddr_bojava = 30;
const ddr_gripou = 60;
const ddr_minorem = 60 * 24 * 30;
const ddr_doutrem = 'production';
const ddr_acateis = 'firefox';
const ddr_dislate = '5.39.0';
const ddr_eternal = 'ddr_eternal';
const ddr_rabeiam = 'ddr_rabeiam';
const ddr_barbeio = 30; // time (in minutes) to 'expire' the maintenance mode (the next request will go through  just fine and may set the flag back again if the server is still in maintenance)
class ddr_raleai {
    // LOG
    static ddr_coite(...ddr_molhou) {
        if (!ddr_raleai.ddr_atirou)
            return;

    }
    static ddr_vetais(...ddr_molhou) {
        if (!ddr_raleai.ddr_ronrom)
            return;

    }
}
_a = ddr_raleai;
ddr_raleai.ddr_atirou = false;
ddr_raleai.ddr_ronrom = true;
ddr_raleai.ddr_ressoo = "https://menoresprecos.dudurochatec.com.br";
// BUILDERS
ddr_raleai.ddr_murem = (ddr_seboso, ddr_boste) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_chule = yield ddr_raleai.ddr_auras(ddr_boste);
    if (!ddr_seboso.startsWith('http'))
        ddr_seboso = ddr_raleai.ddr_ressoo + '/' + ddr_seboso;
    const ddr_retomem = ddr_seboso.includes('?') ? '&' : '?';
    return ddr_seboso + (ddr_chule ? ddr_retomem + ddr_chule : '');
});
ddr_raleai.ddr_auras = (ddr_boste) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ddr_boste)
        ddr_boste = {};
    if (ddr_raleai.ddr_ressoo.includes("influe"))
        ddr_boste.master = 1;
    if (!ddr_boste.localid)
        ddr_boste.localid = yield ddr_raleai.ddr_aferia();
    if (!ddr_boste.isxmode)
        ddr_boste.isxmode = ddr_doutrem;
    if (!ddr_boste.isxversion)
        ddr_boste.isxversion = ddr_dislate;
    if (!ddr_boste.isxbrowser)
        ddr_boste.isxbrowser = ddr_acateis;
    return ddr_boste ? Object.keys(ddr_boste).map(ddr_fosca => ddr_fosca + '=' + encodeURIComponent(ddr_boste[ddr_fosca])).join('&') : '';
});
// REQUESTS
ddr_raleai.ddr_farda = (ddr_seboso, ddr_boste, ddr_gulas) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_fluir = yield ddr_raleai.ddr_murem(ddr_seboso, ddr_boste);
    return ddr_raleai.ddr_zelado(ddr_fluir, { method: 'GET' }, ddr_gulas);
});
ddr_raleai.ddr_oporas = (ddr_exulo, ddr_alicio) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_alivia = yield (0,_bg_ddr_podado.ddr_franza)();
    return ddr_raleai.ddr_farda(`${ddr_exulo}?userhash=${ddr_alivia}`, ddr_alicio, { ttl: ddr_gemada });
});
ddr_raleai.ddr_assome = (ddr_seboso, ddr_boste, ddr_gulas) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_fluir = yield ddr_raleai.ddr_murem(ddr_seboso);
    const ddr_chule = yield ddr_raleai.ddr_auras(ddr_boste);
    const ddr_ronrom = { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: ddr_chule };
    return ddr_raleai.ddr_zelado(ddr_fluir, ddr_ronrom, ddr_gulas);
});
ddr_raleai.ddr_pasmar = (ddr_exulo, ddr_alicio) => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_alivia = yield (0,_bg_ddr_podado.ddr_franza)();
    return ddr_raleai.ddr_assome(`${ddr_exulo}?userhash=${ddr_alivia}`, ddr_alicio, { ttl: ddr_gemada });
});
ddr_raleai.ddr_zelado = (ddr_coaxe, ddr_rodete, ddr_gulas) => {
    const ddr_vibram = '[' + ddr_coaxe.replace(ddr_raleai.ddr_ressoo, '').split('?')[0] + ']';
    ddr_raleai.ddr_coite(ddr_vibram, 'ddr_evasao()', { ttl: ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.ttl });
    const ddr_vazio = JSON.stringify({ url: ddr_coaxe, info: ddr_rodete, options: ddr_gulas });
    if (ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.userhash) {
        ddr_rodete.headers = Object.assign(Object.assign({}, ddr_rodete.headers), { 'userhash': ddr_gulas.userhash });
    }
    return new Promise((ddr_repus, ddr_proso) => __awaiter(void 0, void 0, void 0, function* () {
        const ddr_conetem = yield ddr_raleai.ddr_sisudez();
        if (ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.ttl) {
            ddr_raleai.ddr_coite(ddr_vibram, 'getCache()');
            const ddr_incha = yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda(ddr_vazio, null, ddr_conetem);
            ddr_raleai.ddr_coite(ddr_vibram, 'gotCache?', ddr_incha);
            if (ddr_incha)
                return ddr_repus(ddr_incha);
            ddr_raleai.ddr_coite(ddr_vibram, 'getFailed()');
            const ddr_sadias = yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_xerete(ddr_vazio);
            ddr_raleai.ddr_coite(ddr_vibram, 'gotFailed?', ddr_sadias);
            if (ddr_sadias)
                return ddr_proso("Algo de errado aconteceu.");
        }
        if (ddr_conetem)
            return ddr_repus({});
        ddr_raleai.ddr_vetais(ddr_vibram, 'fecth()');
        fetch(ddr_coaxe, ddr_rodete).then((ddr_rebati) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ddr_rebati.ok) {
                ddr_raleai.ddr_vetais(ddr_vibram, 'statusCode ' + ddr_rebati.status, 'setFail()');
                yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_puniam(ddr_vazio, ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.ttl);
                if (ddr_rebati.status == 401)
                    return ddr_proso("Você não está logado.");
                if (ddr_rebati.status == 403)
                    return ddr_proso("Você não tem permissão pra fazer isso.");
                return ddr_proso("Algo de errado aconteceu.");
            }
            try {
                const ddr_causam = yield ddr_rebati.json();
                yield ddr_raleai.ddr_delirai(ddr_causam.maintenance);
                if (ddr_causam.maintenance)
                    return ddr_repus({});
                if (ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.ttl) {
                    ddr_raleai.ddr_vetais(ddr_vibram, 'good json!', 'setCache()', ddr_causam);
                    yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_enoje(ddr_vazio, ddr_causam, ddr_gulas.ttl);
                }
                if (ddr_causam.error)
                    return ddr_proso(ddr_causam.msg || ddr_causam.error);
                ddr_repus(ddr_causam);
            }
            catch (ddr_tendes) {
                ddr_raleai.ddr_vetais(ddr_vibram, 'bad json', 'setFail()', ddr_tendes === null || ddr_tendes === void 0 ? void 0 : ddr_tendes.message);
                yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_puniam(ddr_vazio, ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.ttl);
                ddr_repus({});
            }
        })).catch((ddr_tendes) => __awaiter(void 0, void 0, void 0, function* () {
            ddr_raleai.ddr_vetais(ddr_vibram, 'bad fetch', 'setFail()', ddr_tendes === null || ddr_tendes === void 0 ? void 0 : ddr_tendes.message);
            yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_puniam(ddr_vazio, ddr_gulas === null || ddr_gulas === void 0 ? void 0 : ddr_gulas.ttl);
            ddr_proso("Algo de errado aconteceu.");
        }));
    }));
};
// LOCALID
ddr_raleai.ddr_juntes = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
ddr_raleai.ddr_aferia = (ddr_tiroide = false) => __awaiter(void 0, void 0, void 0, function* () {
    let ddr_afreto = yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda(`ddr_afreto`);
    if (!ddr_afreto || ddr_tiroide) {
        var ddr_recuem = ('00017').toString().slice(-3);
        ddr_afreto = (ddr_recuem + "-" + ddr_raleai.ddr_juntes() + ddr_raleai.ddr_juntes() + "-" + ddr_raleai.ddr_juntes() + "-" + ddr_raleai.ddr_juntes() + "-" + ddr_raleai.ddr_juntes() + "-" + ddr_raleai.ddr_juntes() + ddr_raleai.ddr_juntes() + ddr_raleai.ddr_juntes());
        yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_enoje(`ddr_afreto`, ddr_afreto, -1);
    }
    return ddr_afreto;
});
// MAINTENANCE
ddr_raleai.ddr_esganes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda(ddr_eternal);
});
ddr_raleai.ddr_sisudez = () => __awaiter(void 0, void 0, void 0, function* () {
    const ddr_conetem = yield ddr_raleai.ddr_esganes();
    return !!ddr_conetem;
});
ddr_raleai.ddr_delirai = (ddr_ginga) => __awaiter(void 0, void 0, void 0, function* () {
    // getting the current value
    const ddr_piche = yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda(ddr_eternal);
    // if they're the same, do nothing
    if (ddr_piche == ddr_ginga)
        return;
    // if we're entering maintenance mode
    if (ddr_ginga) {
        // set the acknowledge flag to false
        yield ddr_raleai.ddr_ementem(false);
        // and set the maintenance mode for the duration
        yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_enoje(ddr_eternal, ddr_ginga, ddr_barbeio);
    }
    else {
        // if we're leaving maintenance mode, just delete the flag
        yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_obsto(ddr_eternal);
    }
});
ddr_raleai.ddr_domacao = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_farda(ddr_rabeiam);
});
ddr_raleai.ddr_ementem = (ddr_ginga) => __awaiter(void 0, void 0, void 0, function* () {
    if (ddr_ginga)
        yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_enoje(ddr_rabeiam, ddr_ginga);
    else
        yield _bg_memcache__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.ddr_obsto(ddr_rabeiam);
});
const ddr_enojado = (ddr_arroba, ddr_seboso, ddr_boste, ddr_valias, ddr_gulas) => {
    ddr_arroba(ddr_seboso, ddr_boste, ddr_gulas).then(ddr_boste => {
        ddr_valias({ status: true, data: ddr_boste });
    }).catch(ddr_boste => {
        ddr_valias({ status: false, error: ddr_boste });
    });
};


/***/ }),

/***/ 495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ddr_dispor)
/* harmony export */ });
/* unused harmony export ddr_anojei */
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ddr_dispor {
    static ddr_lutem() {
        this.ddr_coite('ddr_lutem()');
        return new Promise(ddr_repus => {
            if (this.ddr_macera) {
                ddr_repus(this.ddr_macera);
                return;
            }
            if (this.ddr_receei) {
                this.ddr_coite('ddr_lutem() -> queue');
                this.ddr_ruiste.push(ddr_repus);
                return;
            }
            this.ddr_coite('ddr_agoniem...');
            this.ddr_receei = true;
            const ddr_fingi = indexedDB.open(this.ddr_comica, this.ddr_nitral);
            ddr_fingi.onupgradeneeded = () => {
                this.ddr_coite('ddr_lutem.onupgradeneeded');
                const ddr_macera = ddr_fingi.result;
                const ddr_cremos = ddr_macera.createObjectStore(this.ddr_foquem, { keyPath: "key" });
                ddr_cremos.transaction.oncomplete = () => {
                    this.ddr_coite('ddr_lutem.onupgradeneeded.transaction.oncomplete');
                };
            };
            ddr_fingi.onsuccess = () => {
                this.ddr_coite('ddr_lutem.onsuccess!');
                this.ddr_macera = ddr_fingi.result;
                ddr_repus(this.ddr_macera);
                this.ddr_ruiste.forEach(ddr_repus => ddr_repus(this.ddr_macera));
                this.ddr_ruiste = [];
            };
        });
    }
    static ddr_farda(ddr_fosca, ddr_puxais, ddr_sitiado) {
        this.ddr_coite('ddr_farda()', { ddr_fosca, ddr_puxais });
        return new Promise((ddr_repus) => __awaiter(this, void 0, void 0, function* () {
            const ddr_macera = yield this.ddr_lutem();
            this.ddr_coite('ddr_farda()', ddr_fosca, ddr_puxais);
            const ddr_gajada = ddr_macera.transaction([this.ddr_foquem]);
            const ddr_cremos = ddr_gajada.objectStore(this.ddr_foquem);
            const ddr_abotoe = ddr_cremos.get(ddr_fosca);
            ddr_abotoe.onsuccess = () => {
                var _a, _b;
                this.ddr_coite('ddr_farda.request.onsuccess', ddr_abotoe === null || ddr_abotoe === void 0 ? void 0 : ddr_abotoe.result);
                // getting the entry value
                let ddr_incha = (_a = ddr_abotoe.result) === null || _a === void 0 ? void 0 : _a.value;
                // checking if the entry is expired
                if (ddr_sitiado) {
                    // in maintenance mode, we'll NOT expire cache entries, since we can't fetch them again while the server is dowm
                }
                else {
                    const ddr_modele = ((_b = ddr_abotoe.result) === null || _b === void 0 ? void 0 : _b.expiresAt) || 0;
                    const ddr_repeli = ddr_modele && ddr_modele < Date.now();
                    this.ddr_coite('expired?', ddr_repeli, 'value?', ddr_incha, 'defValue?', ddr_puxais);
                    if (ddr_repeli)
                        ddr_incha = null;
                }
                // using the default value if the entry is not found/undefined
                if (ddr_incha == null || ddr_incha == undefined)
                    ddr_incha = ddr_puxais;
                this.ddr_coite('-> value', ddr_incha);
                ddr_repus(ddr_incha);
            };
            ddr_abotoe.onerror = () => {
                this.ddr_coite('ddr_farda.request.onerror');
                ddr_repus(ddr_puxais);
            };
        }));
    }
    static ddr_xerete(ddr_fosca) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ddr_coite('ddr_xerete()', { ddr_fosca });
            const ddr_ponho = yield this.ddr_farda(ddr_fosca + '@fail');
            return ddr_ponho == 1;
        });
    }
    // ttl in MINUTES
    static ddr_enoje(ddr_fosca, ddr_ginga, ddr_soalho = -1) {
        this.ddr_coite('ddr_enoje()', { ddr_fosca, ddr_ginga, ddr_soalho });
        return new Promise((ddr_repus) => __awaiter(this, void 0, void 0, function* () {
            const ddr_macera = yield this.ddr_lutem();
            yield this.ddr_obsto(ddr_fosca);
            this.ddr_coite('ddr_enoje()', ddr_fosca, ddr_ginga, ddr_soalho);
            const ddr_gajada = ddr_macera.transaction([this.ddr_foquem], "readwrite");
            const ddr_cremos = ddr_gajada.objectStore(this.ddr_foquem);
            const ddr_modele = ddr_soalho > 0 ? Date.now() + ddr_soalho * 1000 * 60 : 0;
            const ddr_abotoe = ddr_cremos.add({ key: ddr_fosca, value: ddr_ginga, expiresAt: ddr_modele });
            ddr_abotoe.onsuccess = () => {
                this.ddr_coite('ddr_enoje.request.onsuccess');
                ddr_repus(ddr_ginga);
            };
        }));
    }
    static ddr_puniam(ddr_fosca, ddr_soalho) {
        this.ddr_coite('ddr_puniam()', { ddr_fosca, ddr_soalho });
        if (!ddr_soalho)
            return Promise.resolve();
        return this.ddr_enoje(ddr_fosca + '@fail', 1, ddr_soalho);
    }
    static ddr_obsto(ddr_fosca) {
        this.ddr_coite('ddr_obsto()', { ddr_fosca });
        return new Promise((ddr_repus) => __awaiter(this, void 0, void 0, function* () {
            const ddr_macera = yield this.ddr_lutem();
            this.ddr_coite('ddr_obsto()', ddr_fosca);
            const ddr_gajada = ddr_macera.transaction([this.ddr_foquem], "readwrite");
            const ddr_cremos = ddr_gajada.objectStore(this.ddr_foquem);
            const ddr_abotoe = ddr_cremos.delete(ddr_fosca);
            ddr_abotoe.onsuccess = () => {
                this.ddr_coite('ddr_obsto.request.onsuccess');
                ddr_repus();
            };
            ddr_abotoe.onerror = () => {
                this.ddr_coite('ddr_obsto.request.onerror');
                ddr_repus();
            };
        }));
    }
    static ddr_semeais(ddr_etapa) {
        this.ddr_coite('ddr_semeais()');
        return new Promise((ddr_repus) => __awaiter(this, void 0, void 0, function* () {
            const ddr_manado = ddr_etapa.map(ddr_fosca => this.ddr_obsto(ddr_fosca));
            Promise.all(ddr_manado).then(() => ddr_repus());
        }));
    }
    static ddr_testa(ddr_fosca) {
        this.ddr_coite('ddr_testa()', { ddr_fosca });
        return new ddr_anojei(ddr_fosca);
    }
    static ddr_estupor() {
        this.ddr_coite('ddr_estupor()');
        return new Promise((ddr_repus) => __awaiter(this, void 0, void 0, function* () {
            this.ddr_coite('ddr_estupor()');
            const ddr_macera = yield this.ddr_lutem();
            const ddr_gajada = ddr_macera.transaction([this.ddr_foquem], "readwrite");
            const ddr_cremos = ddr_gajada.objectStore(this.ddr_foquem);
            const ddr_abotoe = ddr_cremos.getAllKeys();
            ddr_abotoe.onsuccess = () => {
                this.ddr_coite('ddr_estupor.request.onsuccess');
                this.ddr_coite('ddr_estupor', ddr_abotoe.result);
                const ddr_pascal = ddr_abotoe.result.map(ddr_fosca => ddr_fosca.toString()).filter(ddr_puxoes => this.ddr_beijos.some(ddr_ratono => ddr_puxoes.includes(ddr_ratono)));
                this.ddr_coite('ddr_estupor', ddr_pascal);
                this.ddr_semeais(ddr_pascal).then(ddr_repus);
            };
            ddr_abotoe.onerror = () => {
                this.ddr_coite('ddr_estupor.request.onerror');
                ddr_repus();
            };
        }));
    }
    static ddr_lambeei() {

        return new Promise((ddr_repus) => __awaiter(this, void 0, void 0, function* () {
            const ddr_macera = yield this.ddr_lutem();
            const ddr_gajada = ddr_macera.transaction([this.ddr_foquem], "readwrite");
            const ddr_cremos = ddr_gajada.objectStore(this.ddr_foquem);
            const ddr_abotoe = ddr_cremos.getAll();
            ddr_abotoe.onsuccess = () => {
                this.ddr_coite('ddr_lambeei.request.onsuccess');
                this.ddr_coite('ddr_lambeei', ddr_abotoe.result);
                const ddr_pascal = ddr_abotoe.result.filter(ddr_ponho => {
                    const ddr_modele = (ddr_ponho === null || ddr_ponho === void 0 ? void 0 : ddr_ponho.expiresAt) || 0;
                    return ddr_modele && ddr_modele < Date.now();
                }).map(ddr_fosca => ddr_fosca.toString());
                this.ddr_coite('ddr_lambeei', ddr_pascal);
                this.ddr_semeais(ddr_pascal).then(ddr_repus);
            };
            ddr_abotoe.onerror = () => {
                this.ddr_coite('ddr_lambeei.request.onerror');
                ddr_repus();
            };
        }));
    }
    static ddr_coite(...ddr_molhou) {
        if (!this.ddr_negado)
            return;

    }
}
ddr_dispor.ddr_negado = false;
ddr_dispor.ddr_comica = "DB";
ddr_dispor.ddr_nitral = 1;
ddr_dispor.ddr_foquem = "cache";
// prefixes that will be erased on debug-f2
ddr_dispor.ddr_beijos = [
    'checkout',
    'tracking',
    'path',
    'flow',
    // 'settings', <- tutorial flow
    // 'bubble-pos',
    'url',
    'push',
    'services'
];
ddr_dispor.ddr_receei = false;
ddr_dispor.ddr_ruiste = [];
class ddr_anojei {
    constructor(ddr_fosca) {
        this.ddr_vazio = ddr_fosca;
    }
    ddr_farda(ddr_puxais) {
        return ddr_dispor.ddr_farda(this.ddr_vazio, ddr_puxais);
    }
    ddr_enoje(ddr_ginga, ddr_soalho = -1) {
        return ddr_dispor.ddr_enoje(this.ddr_vazio, ddr_ginga, ddr_soalho);
    }
    ddr_afino(ddr_ginga, ddr_soalho = -1, ddr_puxais) {
        return __awaiter(this, void 0, void 0, function* () {
            const ddr_reveze = yield this.ddr_farda(ddr_puxais);
            return this.ddr_enoje(Object.assign(Object.assign({}, ddr_reveze), ddr_ginga), ddr_soalho);
        });
    }
    ddr_obsto() {
        return ddr_dispor.ddr_obsto(this.ddr_vazio);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

/// <reference types="chrome"/>

__webpack_require__(179);
__webpack_require__(467);
__webpack_require__(920);
__webpack_require__(454);
__webpack_require__(271);
__webpack_require__(31);
__webpack_require__(862);
__webpack_require__(941);
__webpack_require__(358);
__webpack_require__(838);
__webpack_require__(591);
__webpack_require__(164);
__webpack_require__(583);
__webpack_require__(77);
__webpack_require__(96);

/******/ })()
;