import { Url } from "../Models/Url.js"
import shortid from "shortid";

export const shortUrl= async (req,res)=>{
     const longUrl= req.body.longUrl;
    const shortCode= shortid.generate()
    const shortUrl= `http://localhost:2200/${shortCode}`

    const newUrl= new Url({shortCode, longUrl})
    await newUrl.save()

    // console.log("short url saved: ", newUrl);
    
    res.render('index.ejs', {shortUrl})
} 


export const getOriginalUrl= async(req, res)=>{
    const shortCode= req.params.shortCode
    const bothUrl= await Url.findOne({shortCode})
    if (bothUrl){
        res.redirect(bothUrl.longUrl)
    }
    else{
        res.json({message:"invalid", bothUrl})
    }
    
}