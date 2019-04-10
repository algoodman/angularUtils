/**
 *
 */

import {FormGroup, NgForm} from '@angular/forms';

import * as _ from 'lodash';
import * as S from 'string';
import * as moment from 'moment-timezone';

export const HqTimeZone = 'America/Los_Angeles';
export const EmailRegexp: RegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

// see almostEqual func for the two constants below
export const FLT_EPSILON = 1.19209290e-7; // Floating point (32-bit) epsilon for equality
export const DBL_EPSILON = 2.2204460492503131e-16; // Double precision (64-bit) epsilon for equality

export class Utils {

	public static NAN = 0 / 0;

	private static newGuid_lut: string[];

	private static nullPattern = /^null | null$|^[^(]* null /i;
	private static undefinedPattern = /^undefined | undefined$|^[^(]* undefined /i;

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
	 * Check whether two numbers are within a specified difference to each other.
	 * Example: a = 1, b=1.2, absoluteDifference = 0.3, should return true because the numbers are less than 0.3 apart.
	 * Copied from an NPM module - https://github.com/scijs/almost-equal
	 * @param a
	 * @param b
	 * @param absoluteTolerance
	 */
	public static almostEqual(a: number, b: number, absoluteTolerance?: number): boolean {
		if (Utils.isNil(a) || Utils.isNil(b)) {
			return false;
		}
		if (Utils.isNil(absoluteTolerance)) {
			absoluteTolerance = DBL_EPSILON;
		}
		const dif = Math.abs(a - b);
		if (dif <= absoluteTolerance) {
			return true;
		}
		return a === b;
	}

	/**
	 * Convert a camel case to dash (or snake casing).
	 * For example:  "firstName" become "first-name"
	 */
	public static camelToDash(str: string) {
		return str.replace(/([A-Z])/g, function ($1) {
			return '-' + $1.toLowerCase();
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
		const name = cookieName + '=';
		const ca = document.cookie.split(';');
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

	public static getMomentFromValue(dateStr: any): moment.Moment {
		let date: moment.Moment = null;
		if (dateStr.hasOwnProperty('_isAMomentObject') && dateStr._isAMomentObject) {
			date = dateStr; // already a moment
		} else if (_.isDate(dateStr)) {
			date = moment.tz(dateStr, HqTimeZone); // convert from date to moment
		} else if (dateStr !== null && Utils.isInteger(dateStr)) {
			// try converting directly from number to moment
			date = moment.tz(dateStr, HqTimeZone);
		} else if (dateStr !== null && (isNaN(dateStr))) {
			// try to parse directly into a Date
			const tmpDt = Date.parse(dateStr);
			if (!isNaN(tmpDt)) {
				date = moment.tz(tmpDt, HqTimeZone);
			} else {
				date = moment.tz(dateStr, 'M/D/YYYY', HqTimeZone); // try converting as a string.
			}
		}
		const DATE_FORMATS = ['M/D/YYYY', 'M-D-YYYY', 'YYYY/M/D', 'YYYY-M-D'];
		if (date === null || !date.isValid()) {
			date = moment.tz(dateStr, DATE_FORMATS, true, HqTimeZone);
		}

		return date;
	}

	public static getMomentFromStringAtStartOfDay(dateStr: any): moment.Moment {
		let dt = Utils.getMomentFromValue(dateStr);
		if (dt && dt.isValid()) {
			dt = dt.startOf('day');
		}
		return dt;
	}

	//return date as millisec for pst
	public static getMilliSecond(inputDate: Number | Date | moment.Moment | string): number {
		return moment.tz(inputDate, HqTimeZone).valueOf();
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

	// from https://github.com/facebookincubator/idx
	// idx is a utility function for traversing properties on objects and arrays.
	// Usage:
	// User class {friends {name: string} }
	// props.user = new User(); props.user.friends.name = 'john';
	// Access the user.friends.name property when you aren't sure if it exists
	// idx(props, _ => _.user.friends.name)
	public static idx<Ti, Tv>(input: Ti, accessor: (input: Ti) => Tv) {
		try {
			return accessor(input);
		} catch (error) {
			if (error instanceof TypeError) {
				if (this.nullPattern.test(<any>error)) {
					return null;
				} else if (this.undefinedPattern.test(<any>error)) {
					return undefined;
				}
			}
			throw error;
		}
	}

	// simulate apache StringUtils
	public static isBlank(a: any): boolean {
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

	public static isNotBlank(a: any): boolean {
		return !Utils.isBlank(a);
	}

	public static isNullOrWhitespace(a: string) {
		// use lodash
		if (Utils.isNil(a)) {
			return true;
		}
		const b: string = a.replace(/\s/g, '');
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


	// isObjectEmpty returns true if o is an object containing no enumerable members.
	public static isObjectEmpty(o: Object): boolean {
		if (_.isObject(o)) {
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

		return EmailRegexp.test(email);
	}

	public static localStorage = {
		// Add item to local storage with optional expirationMin
		setItem: (key: string, obj: any, expirationMin?: number): any => {
			if (!Utils.hasLocalStorage()) {
				return null;
			}
			let expirationTime = null;
			if (expirationMin) {
				const expirationMS = expirationMin * 60 * 1000;
				expirationTime = new Date().getTime() + expirationMS;
			}
			const record = {value: obj, exp: expirationTime};
			window['localStorage'].setItem(key, JSON.stringify(record));
			return obj;
		},
		getItem: (key: string): any => {
			if (!Utils.hasLocalStorage() || !key) {
				return null;
			}
			const record = JSON.parse(window['localStorage'].getItem(key));
			if (!record) {
				return null;
			}
			if (!record.exp || (new Date().getTime() <= record.exp)) {
				return record.value;
			} else {
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

	/**
	 * touch and validate all controls in a form or form group
	 * @param {NgForm | FormGroup} frm
	 */
	public static markFormTouchedAndValidate(frm: NgForm | FormGroup): void {
		(<any>Object).values(frm.controls).forEach(ctrl => {
			ctrl.markAsTouched();
			ctrl.updateValueAndValidity(); // trigger validation
			if (ctrl.controls) {
				ctrl.controls.forEach(c => this.markFormTouchedAndValidate(c));
			}
		});
	}

	// quote() produces a quoted string.This method returns a string that is like the original string except that it
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
		const containerTop = container.scrollTop();
		const containerBottom = containerTop + container.height();
		const elemTop = element[0].offsetTop;
		const elemBottom = elemTop + element.height();
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
				  const r: any = o[b];
				  return (String)(typeof r === 'string' || typeof r === 'number' ? r : a);
			  }
		);
	}

	public static toNumber(value: any): any {
		if (typeof value === 'number') {
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


	// Get a new GUID string (e.g "39982d34-6496-493f-b5ca-7b96b5dbb793")
	// http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	// http://jcward.com/UUID.js
	public static newGuid(): string {
		const lut = Utils.newGuid_lut;
		const d0 = Math.random() * 0xffffffff | 0;
		const d1 = Math.random() * 0xffffffff | 0;
		const d2 = Math.random() * 0xffffffff | 0;
		const d3 = Math.random() * 0xffffffff | 0;
		return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' +
			  lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' +
			  lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] +
			  lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
	}

	// This method accepts a nested object property string (e.g. "home.address?.state") and
	// return an array with of strings of object property names (e.g ['home', 'address', 'state'])
	// http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
	public static dotNotionToArray(dotNotionFielName: string): string[] {
		if (dotNotionFielName) {
			let s = dotNotionFielName.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
			s = s.replace(/^\./, '');           // strip a leading dot
			const propNames = s.split('.');
			for (const idx in propNames) {
				// strip a trailing question mark (e.g Angular 2 safe binding expression [innerHTML]="home.address?.state")
				propNames[idx] = propNames[idx].replace(/\?$/, '');
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
		if (typeof objPropName === 'string') {
			objPropNames = Utils.dotNotionToArray(<string>objPropName);
		} else {
			objPropNames = <Array<string>>objPropName;
		}

		if (objPropNames) {
			for (const propName of objPropNames) {
				if (obj && propName in obj) {
					obj = obj[propName];
				} else {
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

	// Difference from above: Get a time relevant to start of day.
	public static getTimeInMillsAlt(timeString: string): number {
		let timeRegex = /^[0-9][0-9]:[0-9][0-9]$/;
		let isTimeFormat = timeRegex.test(timeString);

		if (isTimeFormat) {
			let splitTime = timeString.split(":");
			let splitHours = Number.parseInt(splitTime[0], 10);
			let splitMinutes = Number.parseInt(splitTime[1], 10);
			return ((splitHours * 60 * 60 * 1000) + (splitMinutes * 60 * 1000));
		}
		return null;
	}

	// Assumes that timeInMills is relative to start of day (so max value = (23 * 60 * 60 * 1000) + (59 * 60 * 1000) = 87340000)
	public static makeTimestringFromMills(timeInMills: number): string {
		let hours = Math.floor((timeInMills / 1000 / 60 / 60));
		let minutes = (timeInMills / 1000 / 60) - (hours * 60);
		let convertedHours = hours.toString(10);
		if (hours < 10) {
			convertedHours = "0" + convertedHours;
		}
		if (hours === 0) {
			convertedHours = "00";
		}
		let convertedMinutes = minutes.toString(10);
		if (minutes < 10) {
			convertedMinutes = "0" + convertedMinutes;
		}
		if (minutes === 0) {
			convertedMinutes = "00";
		}
		return (convertedHours + ":" + convertedMinutes);
	}

	/**
	 * A middleman function because Java is sending out their enums as the string name instead of the value.
	 *
	 * There was a thing P2 did involving Jackson annotations to do the conversion on that side, but for whatever reason we're not doing
	 * it in Settleit.
	 *
	 * Assumes that the Typescript enum is created to match the Java enum.
	 *
	 * (Science below. This is all based on default Typescript/Javascript behavior, so if this doesn't work, then it probably got changed.)
	 * ----------------------------------------------------------------------
	 *
	 * Given the enumset:
	 * enum MyEnum {
	 *     VALUE_1 = 1,
	 *     VALUE_2 = 2,
	 *     VALUE_3 = 5
	 * }
	 *
	 * Object.keys(MyEnum) returns:
	 * ["1", "2", "5", "VALUE_1", "VALUE_2", "VALUE_3"];
	 *
	 * So splitting Object.keys() in half will let us correctly match enum names to their appropriate values.
	 *
	 * ----------------------------------------------------------------------
	 * @param javaValue: The string name of the enum value.
	 * @param javascriptEnum: A Javascript enum set.
	 */
	public static convertJavaEnumNameToJavascriptEnumValue(javaValue: string, javascriptEnum: any): number {
		const enumMembers = Object.keys(javascriptEnum);
		if (enumMembers != null && enumMembers.length > 1) {
			const enumCount: number = enumMembers.length / 2;
			for (let i = 0; i < enumCount; i++) {
				if (enumMembers[enumCount + i] === javaValue) {
					return Number.parseInt(enumMembers[i], 10);
				}
			}
		}
		return null;
	}

}

Utils.initStatic();
