import { syntaxTree } from '@codemirror/language'
import {
	Extension,
	RangeSetBuilder,
	StateField,
	Transaction
} from '@codemirror/state'
import {
	Decoration,
	DecorationSet,
	EditorView,
	WidgetType
} from '@codemirror/view'
import { ProgressBarWidget } from 'progress'

export const progressBarField = StateField.define<DecorationSet>({
	create(state): DecorationSet {
		return Decoration.none
	},
	update(oldState: DecorationSet, transaction: Transaction): DecorationSet {
		const builder = new RangeSetBuilder<Decoration>()

		syntaxTree(transaction.state).iterate({
			enter(node) {
				if (node.type.name.startsWith("list")) {
					// position of the '-' or the '*'
					const listCharFrom = node.from - 2

					builder.add(
						listCharFrom,
						listCharFrom + 1,
						Decoration.replace({
							widget: new ProgressBarWidget()
						})
					)
				}
			}
		})

		return builder.finish()
	},
	provide(field: StateField<DecorationSet>): Extension {
		return EditorView.decorations.from(field)
	}
})
