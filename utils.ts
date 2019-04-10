/**
 *
 */
import {CommonRegex} from './common-regex';

import * as _ from 'lodash';
import * as S from 'string';

import * as moment from 'moment-timezone';


export class Utils {

	public static NAN = 0 / 0;

	private static newGuid_lut: string[];

	private static LocalTimeZone = 'America/Los_Angeles';

	constructor() {
	}

	static initStatic() {
		Utils.newGuid_lut = [];
		for (let i = 0; i < 256; i++) {
			Utils.newGuid_lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
		}
	}

	/**
	 * Add a property on an object if the object doesn't already have that property
	 * @param obj
	 * @param propName
	 * @param propVal
	 */
	public static addPropertyToObject(obj: Object, propName: string, propVal: any): void {
		if (_.isObject(obj)) {
			if (!obj.hasOwnProperty(propName)) {
				obj[propName] = propVal;
			}
		}
	}

	/**
	 * Convert a camel case to dash (or snake casing).
	 * For example:  "firstName" become "first-name"
	 */
	public static camelToDash(str: string) {
		return str.replace(/([A-Z])/g, function ($1) {
			return "-" + $1.toLowerCase();
		});
	}

	/**
	 * returns # chars remaining, including accurate count for CRLF
	 * @param str
	 * @param maxLen
	 * @returns {number}
	 */
	public static charsRemaining(str: string, maxLen: number): number {
		const len = Utils.countChars(str);
		let remain = maxLen - len;
		// Since carriage return is 2 chars, if you have one left and press enter, it will display -1.
		// This is a fix for that edge case
		if (remain < 0) {
			remain = 0;
		}
		return remain;
	}

	/**
	 * counts chars in a string, including accurate count for CRLF
	 * @param str
	 * @returns {number}
	 */
	public static countChars(str: string): number {
		if (Utils.isBlank(str)) {
			return 0;
		}
		let len = str.replace('\r\n', '').length;
		len = len + (str.split(/[\r\n]/).length - 1);

		return len;
	}

	/**
	 * Tries to get the attribute value based on the various ways angular 2 may change an element's attribute name
	 * depending on whether the attribute was bound to a model value or was a literal string
	 * @param attrName
	 * @param element
	 * @returns {null}
	 */
	public static getAttributeFromElement(attrName: string, element: any): any {
		if (!element || element.attr === null) {
			return null;
		}
		if (element.attr(attrName)) {
			return element.attr(attrName);
		}
		let otherName = `ng-reflect-${attrName}-attr`;
		if (element.attr(otherName)) {
			return element.attr(otherName);
		}
		otherName = `attr.${attrName}`;
		if (element.attr(otherName)) {
			return element.attr(otherName);
		}
		return null;
	}

	public static getCookieValue(cookieName: string): any {
		let name = cookieName + '=';
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) !== -1) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}

	public static getMomentFromString(dateStr: any): moment.Moment {
		let date: moment.Moment = null;
		if (dateStr.hasOwnProperty('_isAMomentObject') && dateStr._isAMomentObject) {
			date = dateStr; // already a moment
		} else if (_.isDate(dateStr)) {
			date = moment(dateStr); // convert from date to moment
		} else if (dateStr !== null && (isNaN(dateStr))) {
			// try to parse directly into a Date
			const tmpDt = Date.parse(dateStr);
			if (!isNaN(tmpDt)) {
				date = moment(tmpDt);
			} else {
				date = moment(dateStr, 'M/D/YYYY'); // try converting as a string.
			}
		}
		const DATE_FORMATS = ['M/D/YYYY', 'M-D-YYYY', 'YYYY/M/D', 'YYYY-M-D'];
		if (date === null || !date.isValid()) {
			date = moment(dateStr, DATE_FORMATS, true);
		}

		return date;
	}

	public static getMomentFromStringAtStartOfDay(dateStr: any): moment.Moment {
		let dt = Utils.getMomentFromString(dateStr);
		if (dt && dt.isValid()) {
			dt = dt.startOf('day');
		}
		return dt;
	}

	//return date as millisec for pst
	public static getMilliSecond(inputDate: Number | Date | moment.Moment | string): number {
		return moment.tz(inputDate, this.LocalTimeZone).valueOf();
	}

	public static getCurrentHQTime(): moment.Moment {
		return moment.tz('America/Los_Angeles');
	}

	public static getCurrentHQDate(): moment.Moment {
		return Utils.getCurrentHQTime().startOf('day');
	}


	/**
	 * Get a number value from a string, or NAN
	 * @param val
	 * @returns {Number}
	 */
	public static getNumberFromString(val: any) {
		const tmpVal = Utils.isBlank(val) ? '' : _.isString(val) ? val : val.toString(); // must be string
		let numVal = Number(tmpVal.replace(/[^0-9\.-]+/g, ''));
		if (tmpVal.length === 0) {
			numVal = NaN; // blank is not a number
		}
		return numVal;
	}

	public static hasLocalStorage(): Boolean {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}

	// simulate apache StringUtils
	public static isBlank(a: string): boolean {
		if (Utils.isNil(a)) {
			return true;
		}
		if (_.isString(a) && Utils.isNullOrWhitespace(a)) {
			return true;
		}
		// check object/array is empty
		if ((_.isArray(a) || _.isObject(a)) && _.isEmpty(a)) {
			return true;
		}
		return false;
	}


	public static isFunction(func: any) {
		return _.isFunction(func);
	}

	/**
	 * Use this because Typescript doesn't understand Number.isInteger when the target is ES5.
	 * @param nVal
	 * @returns {boolean}
	 */
	public static isInteger(nVal: any): boolean {
		return typeof nVal === 'number' && isFinite(nVal) && nVal > -9007199254740992 && nVal < 9007199254740992 &&
			  Math.floor(nVal) === nVal;
	}

	public static isNotBlank(a: string): boolean {
		return !Utils.isBlank(a);
	}

	public static isNullOrWhitespace(a: string) {
		// use lodash
		if (Utils.isNil(a)) {
			return true;
		}
		let b: string = a.replace(/\s/g, '');
		return (b.length < 1);
	}

	public static isNil(a: any): boolean {
		return Utils.isNullOrUndefined(a);
	}

	public static isNotNil(a: any): boolean {
		return !Utils.isNullOrUndefined(a);
	}

	public static isNullOrUndefined(a: any): boolean {
		return _.isNull(a) || _.isUndefined(a);
	}


	//isObjectEmpty returns true if o is an object containing no enumerable members.
	public static isObjectEmpty(o: Object): boolean {
		if (Utils.isNotNil(o) && _.isObject(o)) {
			for (const i in o) {
				if (o[i] !== undefined && (typeof o[i]) !== 'function') {
					return false;
				}
			}
		}
		return true;
	}

	public static isValidEmail(email: string): boolean {
		email = S(email).trim().s;

		return CommonRegex.EmailRegexp.test(email);
	}


	public static localStorage = {
		//Add item to local storage with optional expirationMin
		setItem: (key: string, obj: any, expirationMin?: number): any => {
			if (!Utils.hasLocalStorage()) {
				return null;
			}
			let expirationTime = null;
			if (expirationMin) {
				let expirationMS = expirationMin * 60 * 1000;
				expirationTime = new Date().getTime() + expirationMS;
			}
			let record = {value: obj, exp: expirationTime};
			window['localStorage'].setItem(key, JSON.stringify(record));
			return obj;
		},
		getItem: (key: string): any => {
			if (!Utils.hasLocalStorage() || !key) {
				return null;
			}
			let record = JSON.parse(window['localStorage'].getItem(key));
			if (!record) {
				return null;
			}
			if (!record.exp || (new Date().getTime() <= record.exp)) {
				return record.value;
			}
			else {
				window['localStorage'].removeItem(key);
				return null;
			}
		},
		removeItem: (key: string): void => {
			if (!Utils.hasLocalStorage()) {
				return;
			}
			window['localStorage'].removeItem(key);
		}
	};

	//quote() produces a quoted string.This method returns a string that is like the original string except that it
	// is wrapped in quotes and all quote and backslash characters are preceded with backslash.
	public static quote(s: string): string {
		let c, i, l = s.length, o = '"';
		for (i = 0; i < l; i += 1) {
			c = s.charAt(i);
			if (c >= ' ') {
				if (c === '\\' || c === '"') {
					o += '\\';
				}
				o += c;
			} else {
				switch (c) {
					case '\b':
						o += '\\b';
						break;
					case '\f':
						o += '\\f';
						break;
					case '\n':
						o += '\\n';
						break;
					case '\r':
						o += '\\r';
						break;
					case '\t':
						o += '\\t';
						break;
					default:
						c = c.charCodeAt(0);
						o += '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
				}
			}
		}
		return o + '"';
	}

	/*
	 * Scroll the jquery element into view within the jquery container element
	 */
	public static scrollIntoView(element, container): void {
		let containerTop = container.scrollTop();
		let containerBottom = containerTop + container.height();
		let elemTop = element[0].offsetTop;
		let elemBottom = elemTop + element.height();
		if (elemTop < containerTop) {
			container.scrollTop(elemTop);
		} else if (elemBottom > containerBottom) {
			container.scrollTop(elemBottom - container.height());
		}
	}

	/**
	 * If value is a string, convert to float and then round to 2 decimal places
	 * @param strNum
	 * @returns {number}
	 */
	public static stringToCurrency(strNum: any): number {
		return Math.round(Utils.stringToFloat(strNum) * 100) / 100;
	}

	/**
	 * If value is a string, convert to float
	 * @param strNum
	 * @returns {number}
	 */
	public static stringToFloat(strNum: any): number {
		return _.isString(strNum) ? parseFloat(<any>strNum) : strNum;
	}

	/**
	 * If value is a string, convert to integer
	 * @param strNum
	 * @returns {number}
	 */
	public static stringToInteger(strNum: any): number {
		return _.isString(strNum) ? parseInt(<any>strNum, 10) : strNum;
	}

	// supplant() does variable substitution on the string. It scans through the string looking for expressions
	// enclosed in { } braces. If an expression is found, use it as a key on the object, and if the key has a string
	// value or number value, it is substituted for the bracket expression and it repeats.
	public static supplant(s: string, o: Object): string {
		return s.replace(/\{([^{}]*)\}/g,
			  (a: string, b: any) => {
				  let r: any = o[b];
				  return (String)(typeof r === 'string' || typeof r === 'number' ? r : a);
			  }
		);
	}

	public static toNumber(value: any): any {
		if (typeof value == 'number') {
			return value;
		}
		if (_.isObject(value)) {
			return Utils.NAN;
		}
		return +value;
	}

	public static trim(s: string): string {
		return s.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, '$1');
	}

	// Douglas Crockford javascript.crockford.com/remedial.html
	public static typeOf(val: any): string {
		let s: string = typeof val;
		if (s === 'object') {
			if (val) {
				if (Object.prototype.toString.call(val) === '[object Array]') {
					s = 'array';
				}
			} else {
				s = 'null';
			}
		}
		return s;
	}


	//Get a new GUID string (e.g "39982d34-6496-493f-b5ca-7b96b5dbb793")
	//http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	//http://jcward.com/UUID.js
	public static newGuid(): string {
		let lut = Utils.newGuid_lut;
		const d0 = Math.random() * 0xffffffff | 0;
		const d1 = Math.random() * 0xffffffff | 0;
		const d2 = Math.random() * 0xffffffff | 0;
		const d3 = Math.random() * 0xffffffff | 0;
		return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
			  lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
			  lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
			  lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
	}

	//This method accepts a nested object property string (e.g. "home.address?.state") and 
	//return an array with of strings of object property names (e.g ['home', 'address', 'state'])
	//http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
	public static dotNotionToArray(dotNotionFielName: string): string[] {
		if (dotNotionFielName) {
			let s = dotNotionFielName.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
			s = s.replace(/^\./, '');           // strip a leading dot
			//s = s.replace(/\?$/, '');           // strip a trailing question mark (e.g Angular 2 safe binding expression [innerHTML]="home.address?.state")
			let propNames = s.split('.');
			for (let idx in propNames) {
				propNames[idx] = propNames[idx].replace(/\?$/, '');           // strip a trailing question mark (e.g Angular 2 safe binding expression [innerHTML]="home.address?.state")
			}
			return propNames;
		}
	}

	/*
	 Get the value of the property by traversing the obj using the property names in the objPropName.
	 Example 1 (objPropName is a string):
	 This method returns 'CA' when objPropName 'home.address?.state'

	 Example 2 (objPropName is a array of strings):
	 This method returns 'CA' when objPropNames = ['home', 'address', 'state']

	 obj = {
	 name: 'vincent'
	 home: {
	 address: {
	 streetAddress: '1234 Park Way',
	 city: 'Anaheim',
	 state: 'CA'
	 zip: '12345'
	 }
	 }
	 }
	 */
	public static getObjectPropValue(obj: any, objPropName: string | string[]): any {

		let objPropNames: string[];
		if (typeof objPropName === 'string')
			objPropNames = Utils.dotNotionToArray(<string>objPropName);
		else
			objPropNames = <Array<string>>objPropName;

		if (objPropNames) {
			for (let propName of objPropNames) {
				if (obj && propName in obj) {
					obj = obj[propName];
				}
				else {
					return;
				}
			}
		}
		return obj;
	}

	//This method accepts a string in HH:MM format
	//Converts it into a date and return in milliseconds
	public static getTimeInMills(timeString: string): number {
		if (timeString) {
			let timeRegex = /^[0-9][0-9]:[0-9][0-9]$/;
			let isTimeFormat = timeRegex.test(timeString);
			let tempDate = new Date();
			if (isTimeFormat) {
				tempDate.setHours(Number(timeString[0] + timeString[1]));
				tempDate.setMinutes(Number(timeString[3] + timeString[4]));
				tempDate.setSeconds(0);

				return tempDate.getTime();
			}
		}

		return null;
	}
}

Utils.initStatic();