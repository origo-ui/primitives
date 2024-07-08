import { consume, createContext, provide } from "@lit/context";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

const DEFAULT_MAX = 100;

type ProgressState = "indeterminate" | "complete" | "loading";

const valueContext = createContext<number | null>(null);
const maxContext = createContext<number>(DEFAULT_MAX);
const stateContext = createContext<ProgressState>("indeterminate");

@customElement("origo-progress")
export class Progress extends LitElement {
	@provide({ context: valueContext })
	@property({
		type: Number,
		converter: (value) => {
			if (value === null || !value.match(/^-?\d+(\.\d+)?$/)) {
				return null;
			}
			return Number(value);
		},
	})
	value: number | null = null;

	@provide({ context: maxContext })
	@property({ type: Number })
	max = DEFAULT_MAX;

	@provide({ context: stateContext })
	@property({ type: String, reflect: true, attribute: "data-state" })
	dataState: ProgressState = "indeterminate";

	private _updateDataState(value: number | undefined | null, max: number) {
		this.dataState = getProgressState(value, max);
	}

	override render() {
		if ((this.max || this.max === 0) && !isValidMaxNumber(this.max)) {
			console.error(getInvalidMaxError(this.max, "origo-progress"));
		}

		const max = isValidMaxNumber(this.max) ? this.max : DEFAULT_MAX;

		if (this.value !== null && !isValidValueNumber(this.value, max)) {
			console.error(getInvalidValueError(this.value, "origo-progress"));
		}

		const value = isValidValueNumber(this.value, max) ? this.value : null;
		const valueLabel = isNumber(value) ? getValueLabel(value, max) : undefined;

		this._updateDataState(value, max);

		return html`
			<div
				part="root"
				aria-valuemax=${max}
				aria-valuemin="0"
				aria-valuenow=${ifDefined(isNumber(value) ? value : undefined)}
				aria-valuetext=${ifDefined(valueLabel)}
				role="progressbar"
			>
				<slot></slot>
			</div>
    `;
	}
}

@customElement("origo-progress-indicator")
export class ProgressIndicator extends LitElement {
	@consume({ context: valueContext, subscribe: true })
	@property({ type: Number, reflect: true, attribute: "data-value" })
	dataValue: number | null = null;

	@consume({ context: maxContext, subscribe: true })
	@property({ type: Number, reflect: true, attribute: "data-max" })
	dataMax = DEFAULT_MAX;

	@consume({ context: stateContext, subscribe: true })
	@property({ type: String, reflect: true, attribute: "data-state" })
	dataState: ProgressState = "indeterminate";

	override render() {
		return html`
			<div part="root"></div>
    `;
	}
}

function getValueLabel(value: number, max: number) {
	return `${Math.round((value / max) * 100)}%`;
}

function getProgressState(
	value: number | undefined | null,
	maxValue: number,
): ProgressState {
	return value == null
		? "indeterminate"
		: value === maxValue
			? "complete"
			: "loading";
}

function isNumber(value: number | null | undefined): value is number {
	return typeof value === "number";
}

function isValidMaxNumber(max: number | null | undefined): max is number {
	return isNumber(max) && !Number.isNaN(max) && max > 0;
}

function isValidValueNumber(
	value: number | null | undefined,
	max: number,
): value is number {
	return isNumber(value) && !Number.isNaN(value) && value <= max && value >= 0;
}

function getInvalidMaxError(
	max: number | null | undefined,
	componentName: string,
) {
	return `Invalid \`max\` of value \`${max}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}

function getInvalidValueError(
	value: number | null | undefined,
	componentName: string,
) {
	return `Invalid \`value\` of value \`${value}\` supplied to \`${componentName}\`. The \`value\` must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}

declare global {
	interface HTMLElementTagNameMap {
		"origo-progress": Progress;
	}
}
