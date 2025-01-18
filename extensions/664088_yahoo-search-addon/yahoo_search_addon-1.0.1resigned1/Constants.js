function Constants(){ //jshint ignore : line
    //Common constants
    this.CHR_EXT_SPACE_ID = "151340124";
    this.FF_EXT_SPACE_ID = "151340125";
    this.CHR_EXT_FR_CODE = "yset_bnr_chr_win"; //SDTBE-1404
    this.FF_EXT_FR_CODE = "yset_bnr_ff_win";
    this.TRACKER_PAGE_INFO = "page_info";
    this.TRACKER_CLICK_INFO = "click_info";
    this.TRACKER_ITYPE_INSTALL = 'install';
    this.TRACKER_ITYPE_ALIVE = 'live';
    this.TRACKER_BROWSER_FF = 'ff';
    this.TRACKER_BROWSER_CHR = 'chr';
    this.TRACKER_ALIVE_PING_INTERVAL = 14400000 ;// 4 hrs = 4 * 60 * 60 * 1000 milli sec.
    this.twoWeeks = 14*24*3600*1000;

    this.TRACKER_PAGE_INFO_TEMPLATE = {
        "trackEvt": this.TRACKER_PAGE_INFO,
        "trackParams":
        {
            "intl": "{intl}",
            "vtestid": "default",
            "ver": "{ver}",
            "itype": "{itype}",
            "fr": "{fr}",
            "ctid": "{ctid}",
            "mrkt": "{mrkt}",
            "delc": "{ext}",
            "cset": "{cset}",
            "mset": "{mset}",
            "browser": "{browser}",
            "os": "{os}"
        },
        "useYLC": false,
        "trackSpaceID": "{spaceId}"
    };
    this.TRACKER_CLICK_INFO_TEMPLATE = {
        "trackEvt": this.TRACKER_CLICK_INFO,
        "trackParams":
        {
            "intl": "{intl}",
            "vtestid": "default",
            "ver": "{ver}",
            "ctid": "{ctid}",
            "mrkt": "{mrkt}",
            "sec": "{sec}",
            "slk": "{slk}",
            "tar": "{tar}",
            "_p": "{_p}",
            "gpos": "{gpos}",
            "delc": "{ext}",
            "browser": "{browser}",
            "os": "{os}"
        },
        "useYLC": true,
        "trackSpaceID": "{spaceId}"
    };


    //Chrome Specific Contstants
    this.uninstallURL = "https://www.yahoo.com/?fr=yset_chr_ext_exit";

}