module.exports=({env})=>({
    upload:{
        provider:'aws-s3',
        providerOption:{
            accessKeyId: 'AKIA6AA2F76S5T4GS64P',
            secretAccessKey:'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',
            region:'eu-west-3',
            params:{
                Bucket:'ob2a'
            }
        }
    }
})
