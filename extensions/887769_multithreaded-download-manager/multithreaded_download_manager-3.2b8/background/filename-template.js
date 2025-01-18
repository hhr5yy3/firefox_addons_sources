import { ExtendableError } from "../util/error.js";
import { S } from "./settings.js";
import { DEFAULT_FILENAME_TEMPLATE } from "../common/settings.js";
import { parseURLEncodedFilename } from "./content-disposition.js";
class FilenameTemplateError extends ExtendableError {
}
function decodePathname(pathname) {
    return pathname.split(/([\\/])/).map(parseURLEncodedFilename).join('');
}
let platformOS = 'win';
export const filenameRequirementsInitialized = browser.runtime.getPlatformInfo().then(({ os }) => { platformOS = os; });
class FilenameTemplateResolver {
    constructor() {
        this.str = '';
        this.firstExpr = false;
    }
    putURL(url) {
        if (!url) {
            this.str = '';
            return;
        }
        try {
            const obj = new URL(url);
            this.str = (obj.host.replace(/:/g, '_') +
                decodeURIComponent(obj.pathname).replace(/[\\\/]*$/, '')); // TODO %2F
        }
        catch {
            throw new FilenameTemplateError('_URL_');
        }
    }
    resolve(data) {
        this.data = data;
        let ft = this.data.filenameTemplate || '';
        if (!ft || ft.endsWith('/') || ft.endsWith('\\'))
            ft += S.filenameTemplate || DEFAULT_FILENAME_TEMPLATE;
        let name = ft.replace(/\*([\w.]*)\*/g, (_, e) => {
            try {
                if (!e)
                    return '*';
                this.putURL(this.data.url);
                this.firstExpr = true;
                const exprs = e.split('.');
                for (const expr of exprs) {
                    const key = 'expr_' + expr.toLowerCase();
                    if (!(key in this))
                        throw new FilenameTemplateError('_UNKNOWN_');
                    void this[key]();
                    this.firstExpr = false;
                }
                return decodePathname(this.str);
            }
            catch (e) {
                if (e instanceof FilenameTemplateError)
                    return e.message;
                return '_ERROR_';
            }
        });
        name = this.fixOSFilename(name);
        return name || '_DOWNLOAD_';
    }
    fixOSFilename(name) {
        name = name.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ');
        if (platformOS === 'win')
            name = name.replace(/[:*"?<>|]/g, c => `-_'_()_`[':*"?<>|'.indexOf(c)]);
        else if (platformOS === 'android')
            name = name.replace(/[:*"?<>|;,+=\[\]]/g, c => `-_'_()_  --()`[':*"?<>|;,+=[]'.indexOf(c)]);
        else
            name = name.replace(/:/g, '-');
        name = name.replace(/\s{2,}/g, " ");
        const result = [];
        for (const component of name.split(/[\\/]/)) {
            let s = component.trim();
            if (s === '' || s === '.')
                continue;
            if (s === '..') {
                result.pop();
                continue;
            }
            if (platformOS === 'win')
                s = s.replace(/^\s*(?:CON|PRN|AUX|NUL|COM\d|LPT\d|CONIN\$|CONOUT\$)(?=\s*(?:\.|$))/i, '$&_');
            s = s.replace(/^\./, '_').replace(/\.$/, '_'); // enforced by Firefox
            result.push(s);
        }
        return result.length ? result.join('/') : 'Download';
    }
    expr_name() {
        if (this.firstExpr && this.data.substituteFilename)
            this.str = this.data.substituteFilename;
        this.str = this.str.replace(/[\\\/]*$/, '').replace(/.*[\\\/]/, '');
    }
    expr_base() {
        this.expr_name();
        this.str = this.str.replace(/\.[^.]*$/, '');
    }
    expr_ext() {
        this.expr_name();
        this.str = (this.str.match(/\.[^.]*$/) || [''])[0];
    }
    expr_url() { this.putURL(this.data.url); }
    expr_referer() { this.putURL(this.data.referrer); }
    expr_host() { this.str = this.str.replace(/\/.*/, ''); }
    expr_inum() { this.str = '' + this.data.inum; }
    expr_year() { this.str = '' + this.data.creationDate.getFullYear(); }
    expr_month() { this.str = '' + (this.data.creationDate.getMonth() + 1); }
    expr_day() { this.str = '' + this.data.creationDate.getDate(); }
    expr_hour() { this.str = '' + this.data.creationDate.getHours(); }
    expr_minute() { this.str = '' + this.data.creationDate.getMinutes(); }
    expr_second() { this.str = '' + this.data.creationDate.getSeconds(); }
    expr_00() {
        while (this.str.length < 2)
            this.str = '0' + this.str;
    }
    expr_text() { this.str = this.data.text || ''; }
}
export function resolveFilenameTemplate(data) {
    return new FilenameTemplateResolver().resolve(data);
}
