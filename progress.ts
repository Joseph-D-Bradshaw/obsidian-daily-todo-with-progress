export default class ProgressBarWidget extends WidgetType {
	toDOM(view: EditorView): HTMLElement {
		const div = document.createElement("div")
		div.innerText = "progress bar!"
		return div
	}
}

