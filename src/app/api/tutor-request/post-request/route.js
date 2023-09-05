import { NextResponse } from "next/server";
import connect from "@/utils/db.js";
import Tutor_request from "../../../../models/Tutor_request";


// import { Users } from "@/models/Users"; 

export const POST = async (request) => {
  try {
    // Connect to the MongoDB database
    await connect();
    
    // Parse request body
    const { 
        name,
        phone,
        medium,
        classname,
        district,
        area,
     } = await request.json();
    // console.log( name,
    //   phone,
    //   medium,
    //   classname,
    //   district,
    //   area,);

    // check existing users
    const tutorRequest = await Tutor_request.findOne({phone});
    if(tutorRequest){
      return new NextResponse ({error: " already exists"}, {status: 400})
    }

    // Create a new user instance
    const newTutorRequest = new Tutor_request({  name,
      phone,
      medium,
      classname,
      district,
      area });
    console.log('newTutor',newTutorRequest);

    // Save the new user to the database
    const savedTutorRequest = await newTutorRequest.save();
    console.log('SaveRequest',savedTutorRequest);

    return NextResponse.json({ message: "Users stored successfully!",
                               success: true,
                               savedTutorRequest }, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse("Internal Server Error", { status: 500 });
  }
};
