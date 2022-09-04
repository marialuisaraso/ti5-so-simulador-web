export function main() {
    console.log('klaalla');
}

if (typeof require !== 'undefined' && require.main === module) {
    main();
}
