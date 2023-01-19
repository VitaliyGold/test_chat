export default function(context) {
	return {
		Identifier(node) {
			const haveSnakeCase = node.name.includes('_') && node.name !== '_';
			if (haveSnakeCase) {
				context.report({
					node,
					message: 'Do not use snake case',
					fix(fixer) {
				
						let varibleWithCamelCase = '';
				
						for (let i = 0; i < node.name.length; i++) {
							if (node.name[i] === '_') {
								varibleWithCamelCase += node.name[i+1].toUpperCase();
								i++;
							} else {
								varibleWithCamelCase += node.name[i];
							}
						}
					
				
						return [
							fixer.replaceTextRange([node.start, node.end], varibleWithCamelCase),

						];
					},
				});
			}

		}
	};
}
  