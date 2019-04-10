export namespace CommonRegex {

	export const AbaRegexp: RegExp = /\b\d{9}\b/;

	export const CreditCardRegexp: RegExp = /^(?:4[0-9]{3}-[0-9]{4}-[0-9]{4}-[0-9]{4}(?:[0-9]{3})?|5[0-9]{3}-[0-9]{4}-[0-9]{4}-[0-9]{4}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;

	export const EinRegexp: RegExp = /^[0-9]{2}[\. -]{0,1}[0-9]{7}$/;

	export const EmailRegexp: RegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	export const PhoneRegexp: RegExp = /^[(]{0,1}[2-9]{1}[0-9]{2}[)\. \-]{0,1}[0-9]{3}[\. \-]{0,1}[0-9]{4}$/;

	export const SsnRegexp: RegExp = /^[0-9]{3}[\. -]{0,1}[0-9]{2}[\. -]{0,1}[0-9]{4}$/;

	export const TimeRegexp: RegExp = /^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;

}
