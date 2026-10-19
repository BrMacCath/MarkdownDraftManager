export function makeDraftName(title: string, version: number): string {
	return `${title.trim()}-draft-${version}`;
}