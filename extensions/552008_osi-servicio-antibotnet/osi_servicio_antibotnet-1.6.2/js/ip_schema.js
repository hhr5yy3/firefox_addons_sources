const ip_schema = {
    "title": "CAB JSON Schema",
    "type":"object",
    "$schema": "http://json-schema.org/draft-03/schema#",
    "required": ["ip", "error"],
    "properties":{
        "ip": {
            "type":"string"
        },

        "error": {
            "type":"string"
        },

        "evidences": {
            "type":"array",
            "items": {
                "type":"object",
                "properties":{
                    "name": {
                        "type":"string"
                    },
                    "threatCode": {
                        "type":"string"
                    },
                    "operatingSystems": {
                        "type":"array",
                        "items": {
                            "type":"object",
                            "properties":{
                                "operatingSystem": {
                                    "type":"string"
                                },
                                "disinfectUrl": {
                                    "type":"string"
                                }
                            }
                        }
                    },
                    "descriptionUrl": {
                        "type":"string"
                    },
                    "timestamp": {
                        "type":"string"
                    }
                }
            }
        }
    }
};
