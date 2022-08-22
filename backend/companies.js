Data.find(arg_object, function (err, data){
        if (err){
                console.log(err);
        }
        else {
                console.log("LENGTH", data.length)

                for (i in data) {
                        Companies.find({_id: data[i]['_id']})
                            .then(companies => {
                                    console.log("Company Name:")
                                    console.log("NAME >>>> >>>> ", companies[0]['name']);
                                    return companies
                            })
                            .catch(err => {
                                    console.log(err);
                            })

                        search_reply = {
                                '_id': data[i]['_id'],
                                'title': data[i]['title'],
                                'url': data[i]['url'],
                                'release_date': data[i]['release_date'],
                                'document_date': data[i]['document_date'],
                                'name': companies[0]['name'],
                        }
                        answers[i] = search_reply
                }

                return res.json(answers);
        }
})