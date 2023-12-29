function getEnumKeys<
    T extends string,
    TEnumValue extends string | number,
>(enumVariable: { [key in T]: TEnumValue }) {
    return Object.keys(enumVariable) as Array<T>;
}

// {getEnumKeys(PartOfSpeech).map((key, index) => (
//     <option key={index} value={PartOfSpeech[key]}>
//         {key}
//     </option>
// ))}

export default getEnumKeys