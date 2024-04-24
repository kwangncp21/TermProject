const Hospital = require('../models/Hospital');

exports.getWorkspace= async(req,res,next)=>{
    let query;
    //Copy req.query
    const reqQuery = {...req.query};
    
    //Fields to exclude
    const removeFileds = ['select','sort','page','limit'];
        // ...
        //sort
        // ...

    //Loop over remove fields and delete them from reqQuery
    removeFileds.forEach(param=>delete reqQuery[param]);
    console.log("Query message",req.query);
    
    //Create query string
    let queryStr=JSON.stringify(reqQuery);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g , match=>`$${match}`);

    query=Hospital.find(JSON.parse(queryStr)).populate(`appointments`);
    
    //Select Fields
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    //Sort
    if(req.query.sort){
        const sortBy= req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    }else{
        query=query.sort('name');
    }
    //Pagination
    const page= parseInt(req.query.page,10)||1;
    const limit= parseInt(req.query.limit,10)||25;
    const startIndex= (page-1)*limit;
    const endIndex= page*limit;
    
    try{
        const total= await Hospital.countDocuments();
        query=query.skip(startIndex).limit(limit);
        //execute query
        const hospitals = await query;
        //pagination
        const pagination={};

        if(endIndex<total){
            pagination.next={
                page:page+1,limit
            }
        }
        if(startIndex>0){
            pagination.prev={
                page:page-1,limit
            }
        }

        // const hospitals = await Hospital.find(req.query);
        console.log("Query message",req.query);

        res.status(200).json({success:true,count:hospitals.length,pagination,data:hospitals});
    }catch(err){
        res.status(400).json({success:false});
    }
};