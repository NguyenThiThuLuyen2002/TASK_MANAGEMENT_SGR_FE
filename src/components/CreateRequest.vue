<template>
    <div class="container mx-auto p-6 w-4/5 ">
        <h1 class="text-4xl font-semibold mb-4">Create request</h1>

        <!-- Title -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Title<span class="text-red-500">*</span></label>
            <input v-model="title" type="text" class="border border-2 rounded-md p-2 w-full" />
        </div>
        <!-- Title -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Deadline<span class="text-red-500">*</span></label>
            <input v-model="deadline" type="date" class="border border-2 rounded-md p-2 w-full" />
        </div>



        <!-- Status -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Status<span class="text-red-500">*</span></label>
            <select v-model="status" class="border-2 rounded-md p-2 w-full cursor-not-allowed bg-gray-200" disabled>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
        </div>

        <!-- Description -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Description<span class="text-red-500">*</span></label>
            <textarea v-model="description" class="border-2 rounded-md p-2 w-full h-32"></textarea>
        </div>
        <!-- File Upload -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Upload File</label>
            <input type="file" @change="handleFileUpload" class="block w-full p-2 border rounded-md" />
        </div>

        <div class="flex justify-between items-center mt-8">
            <div>
                <!-- Nút Refresh -->
                <button @click="refreshForm"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Refresh
                </button>
            </div>
            <div>
                <!-- Nút Cancel  -->
                <button @click="this.$router.push({ name: 'requestList' })"
                    class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4">
                    Cancel
                </button>
                <!-- Nút Submit  -->
                <button @click="submitForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>

import axios from 'axios';
export default {
    data() {
        return {
            title: "title1",
            deadline: "2023-12-21",
            status: "Open",
            description: "",
            file: null, //  a property to store the selected file
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
            if (this.file) {
                console.log("Selected file:", this.file.name);
            }
        },
        async submitForm() {
            if (this.title && this.deadline && this.status && this.description) {
                try {
                    // // Create a FormData object to send files
                    let formData = new FormData();
                    formData.append("data", this.file);

                    // Upload the file and get the URL from the API
                    const uploadResponse = await axios.post("http://127.0.0.1:3001/auth/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    console.log(uploadResponse)

                    // Use the obtained URL in your request object
                    let request = {
                        title: this.title,
                        deadline: this.deadline,
                        status: this.status,
                        description: this.description,
                        fileUrl: uploadResponse.data.response.Location,
                    };

                    let jwt =   localStorage.getItem('accessToken') 
                    jwt = "Bearer " + jwt
                    console.log(jwt)

                    // // Post the request to your API
                    const response = await axios.post("http://127.0.0.1:3001/task", request, {
                        headers: {
                            Authorization: jwt
                        },
            });
            console.log(response)
            try {
                if (response)
                    this.$router.push({ name: "itemDetail", params: { id: response.data.ID } });
            } catch (err) {
                console.error('Error:', err);
            }


        } catch(error) {
            console.error("Error:", error);
        }
    } else {
        alert("Please fill in all required information.");
    }
},
refreshForm() {
    // Đặt lại giá trị của tất cả các trường về giá trị mặc định hoặc trống
    this.title = "";
    this.deadline = "";
    this.status = "Open";
    this.description = "";

},

    },
};
</script>
  