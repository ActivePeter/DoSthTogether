import {PaState} from "@/store/pastate";
import {RouteControl} from "@/store/route_control";
import {api_articles_getwithtag} from "@/store/net/api_articles_getwithtag";
import {Article, ArticleMap} from "@/store/models/article";
import {Notify} from "@/util/notify";
import {api_article_new} from "@/store/net/api_article_new";

export class ArticleProxy{
    article_map=new ArticleMap()

    private edit_article_state={
        rawtext:"",
        content:"",
        title:"",
    }
    edit_article_state_reset(){
        this.edit_article_state={
            rawtext:"",
            content:"",
            title:"",
        }
    }
    edit_article_change_content(rawtext:string,content:string){
        this.edit_article_state.content=content;
        this.edit_article_state.rawtext=rawtext;
    }
    edit_article_change_title(title:string){
        this.edit_article_state.title=title;
    }
    edit_article_try_upload(tagselected:any){
        if(this.edit_article_state.title.length==0){
            Notify.warn("未填写文章标题","")
            return;
        }
        if(this.edit_article_state.preview.length==0){
            Notify.warn("未填写文章内容","")
            return;
        }
        const tags=[]
        for (const k in tagselected){
            tags.push(tagselected[k])
        }
        const state=this.edit_article_state
        api_article_new(tags,state.content, state.rawtext, state.title).then(
            (res)=>{
            if(res){
                Notify.common("success","创建文章成功"+res,"")
            }
        })
    }

    sync_info_in_title(){
        const curmode=RouteControl.get_article_mode()
        this.state.article_mode=curmode
    }
    get_cur_mode(){
        return this.state.article_mode
    }
    get_articles_with_selected_tags_for_preview(){
        api_articles_getwithtag([]).then(
            res=>{
                if(res!=undefined){
                    const preview_arts: number[]=[]
                    res.articles.forEach((v)=>{
                        this.article_map.insert(v)
                        preview_arts.push(v.id)
                    })
                    this.state.preview_articles=preview_arts
                }
            }
        )
    }
    get_preview_articles(){
        return this.state.preview_articles
    }
    constructor(private state:PaState) {
    }
}