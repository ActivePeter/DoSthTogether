import {UserSimpleInfo} from "@/store/models/user";

export class Article{
    constructor(
        public id:number,
        public title:string,
        public content:string,
        public author:string
    ) {
    }
}

export class ArticlePreview{
    constructor(
        public id:number,
        public title:string,
        public contentcut:string,
        public authorinfo:UserSimpleInfo
    ) {
    }
}
export class PageOfArticle{
    constructor(
        public pageindex:number,
        public articles:ArticlePreview[]
    ) {
    }
    static testpre(){
        let arr=[]
        for(let i=0;i<10;i++){
            arr.push(
                new ArticlePreview(
                    0,
                    "title",
                    "content",
                    new UserSimpleInfo(
                        "hhh",
                        ""
                    )
                )
            )
        }
        return new PageOfArticle(
            0,
            arr
        )
    }
}