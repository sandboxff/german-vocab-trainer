import { useState } from "react";
import getEnumKeys from "../utils/utils";
import { useForm, SubmitHandler } from "react-hook-form";

enum PartOfSpeech {
    noun = "noun",
    verb = "verb",
    adjective = "adjective"
}

enum Level {
    a1 = "A1",
    a2 = "A2",
    b1 = "B1",
    b2Plus = "B2+"
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
    level: Level,
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
    const { register, handleSubmit, unregister, formState } = form
    const onSubmit: SubmitHandler<WordFormInput> = (data) => console.log(data);
    const [partOfSpeech, setPartOfSpeech] = useState("noun")
    const { errors } = formState
    

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="word">German word</label>
                <input type="text" id="word" {...register("word", {required: {value: true, message: "This field is required"}})}></input>
                <p className="form-validation-error">{errors.word?.message}</p>

                <label htmlFor="slovakTranslation">Slovak translation</label>
                <input type="text" id="slovakTranslation" {...register("slovakTranslation", {required: {value: true, message: "This field is required"}})}></input>
                <p className="form-validation-error">{errors.slovakTranslation?.message}</p>

                <label htmlFor="englishTranslation">English translation</label>
                <input type="text" id="englishTranslation" {...register("englishTranslation", {required: {value: true, message: "This field is required"}})}></input>
                <p className="form-validation-error">{errors.englishTranslation?.message}</p>

                <label htmlFor="level">Level</label>
                <select id="level" {...register("level", {required: true})}>
                {getEnumKeys(Level).map((key, index) => (
                    <option key={index} value={Level[key]}>
                        {Level[key]}
                    </option>
                ))}
                </select>
                <p className="form-validation-error">{errors.level?.message}</p>

                <label htmlFor="partOfSpeech">Part of speech</label>
                <select id="partOfSpeech" {...register("partOfSpeech", {required: {value: true, message: "This field is required"}})} onChange={(e)=>{
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
                <p className="form-validation-error">{errors.partOfSpeech?.message}</p>

                {partOfSpeech === "noun" ? (
                    <>
                        <label htmlFor="article">Article</label>
                        <select id="article" {...register("nounDetails.article", {required: {value: true, message: "This field is required"}})}>
                        {getEnumKeys(Article).map((key, index) => (
                            <option key={index} value={Article[key]}>
                                {key}
                            </option>
                        ))}
                        </select>
                        <p className="form-validation-error">{errors.nounDetails?.article?.message}</p>

                        <label htmlFor="genitive">Genitive</label>
                        <input type="text" id="genitive" {...register("nounDetails.genitive", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.nounDetails?.genitive?.message}</p>

                        <label htmlFor="plural">Plural</label>
                        <input type="text" id="plural" {...register("nounDetails.plural", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.nounDetails?.plural?.message}</p>
                    </>
                ): (<></>) }
                {partOfSpeech === "verb" ? (
                    <>
                        <label htmlFor="isRegular">Regular</label>
                        <input type="checkbox" id="isRegular" {...register("verbDetails.isRegular", {value: true})}></input>
                        <p className="form-validation-error">{errors.verbDetails?.isRegular?.message}</p>

                        <label htmlFor="present">Present tense (3rd person, singular)</label>
                        <input type="text" id="present" {...register("verbDetails.present", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.verbDetails?.present?.message}</p>

                        <label htmlFor="pastSimple">Past simple (3rd person, singular)</label>
                        <input type="text" id="pastSimple" {...register("verbDetails.pastSimple", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.verbDetails?.pastSimple?.message}</p>

                        <label htmlFor="pastPerfect">Past perfect (3rd person, singular)</label>
                        <input type="text" id="pastPerfect" {...register("verbDetails.pastPerfect", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.verbDetails?.pastPerfect?.message}</p>
                    </>
                ): (<></>)}
                {partOfSpeech === "adjective" ? (
                    <>
                        <label htmlFor="isRegular">Regular</label>
                        <input type="checkbox" id="isRegular" {...register("adjectiveDetails.isRegular", {value: true})}></input>
                        <p className="form-validation-error">{errors.adjectiveDetails?.isRegular?.message}</p>

                        <label htmlFor="comparative">Comparative</label>
                        <input type="text" id="comparative" {...register("adjectiveDetails.comparative", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.adjectiveDetails?.comparative?.message}</p>

                        <label htmlFor="superlative">Superlative</label>
                        <input type="text" id="superlative" {...register("adjectiveDetails.superlative", {required: {value: true, message: "This field is required"}})}></input>
                        <p className="form-validation-error">{errors.adjectiveDetails?.superlative?.message}</p>
                    </>
                ): (<></>)}
                <input type="submit" />
            </form>
        </div>
    )
}

export default WordForm