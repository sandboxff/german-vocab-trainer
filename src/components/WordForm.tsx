import React, { useState } from "react";
import getEnumKeys from "../utils/utils";
import { useForm, SubmitHandler } from "react-hook-form";

enum PartOfSpeech {
    noun = "noun",
    verb = "verb",
    adjective = "adjective"
}

enum Article {
    der = "der",
    die = "die",
    das = "das"
}

interface WordFormInput {
    word: string,
    slovakTranslation: string,
    englishTranslation: string,
    partOfSpeech: PartOfSpeech,
    nounDetails?: {
        article: Article,
        genitive: string,
        plural: string
    }
    verbDetails?: {
        isRegular: boolean,
        present: string,
        pastSimple: string,
        pastPerfect: string
    }
    adjectiveDetails?: {
        isRegular: boolean,
        comparative: string,
        superlative: string
    }
}

function WordForm() {

    const form = useForm<WordFormInput>();
    const { register, handleSubmit, unregister } = form
    const onSubmit: SubmitHandler<WordFormInput> = (data) => console.log(data);
    const [partOfSpeech, setPartOfSpeech] = useState("noun")
    

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="word">German word</label>
                <input type="text" id="word" {...register("word")}></input>

                <label htmlFor="slovakTranslation">Slovak translation</label>
                <input type="text" id="slovakTranslation" {...register("slovakTranslation")}></input>

                <label htmlFor="englishTranslation">English translation</label>
                <input type="text" id="englishTranslation" {...register("englishTranslation")}></input>

                <label htmlFor="partOfSpeech">Part of speech</label>
                <select id="partOfSpeech" {...register("partOfSpeech")} onChange={(e)=>{
                    setPartOfSpeech(e.target.value); console.log(e.target.value);
                    if(e.target.value != "noun") {
                        unregister("nounDetails")
                    }
                    if(e.target.value != "verb") {
                        unregister("verbDetails")
                    }
                    if(e.target.value != "adjective") {
                        unregister("adjectiveDetails")
                    }
                }}>
                {getEnumKeys(PartOfSpeech).map((key, index) => (
                    <option key={index} value={PartOfSpeech[key]}>
                        {key}
                    </option>
                ))}
                </select>
                {partOfSpeech === "noun" ? (
                    <>
                        <label htmlFor="article">Article</label>
                        <select id="article" {...register("nounDetails.article")}>
                        {getEnumKeys(Article).map((key, index) => (
                            <option key={index} value={Article[key]}>
                                {key}
                            </option>
                        ))}
                        </select>

                        <label htmlFor="genitive">Genitive</label>
                        <input type="text" id="genitive" {...register("nounDetails.genitive")}></input>

                        <label htmlFor="plural">Plural</label>
                        <input type="text" id="plural" {...register("nounDetails.plural")}></input>
                    </>
                ): (<></>) }
                {partOfSpeech === "verb" ? (
                    <>
                        <label htmlFor="isRegular">Regular</label>
                        <input type="checkbox" id="isRegular" {...register("verbDetails.isRegular")} checked></input>

                        <label htmlFor="present">Present tense (3rd person, singular)</label>
                        <input type="text" id="present" {...register("verbDetails.present")}></input>

                        <label htmlFor="pastSimple">Past simple (3rd person, singular)</label>
                        <input type="text" id="pastSimple" {...register("verbDetails.pastSimple")}></input>

                        <label htmlFor="pastPerfect">Past perfect (3rd person, singular)</label>
                        <input type="text" id="pastPerfect" {...register("verbDetails.pastPerfect")}></input>
                    </>
                ): (<></>)}
                {partOfSpeech === "adjective" ? (
                    <>
                        <label htmlFor="isRegular">Regular</label>
                        <input type="checkbox" id="isRegular" {...register("adjectiveDetails.isRegular")} checked></input>

                        <label htmlFor="comparative">Comparative</label>
                        <input type="text" id="comparative" {...register("adjectiveDetails.comparative")}></input>

                        <label htmlFor="superlative">Superlative</label>
                        <input type="text" id="superlative" {...register("adjectiveDetails.superlative")}></input>
                    </>
                ): (<></>)}
                <input type="submit" />
            </form>
        </div>
    )
}

export default WordForm