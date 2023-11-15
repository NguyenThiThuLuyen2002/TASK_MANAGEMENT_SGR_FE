
<template>
    <SideBar></SideBar>
    <div class="container mx-auto p-6 w-3/5 ">
        <h3 class="text-4xl font-semibold mb-4">Create Request</h3>
        <!-- Title -->
        <div class="mb-4">
            <label class="block mb-2  text-sm font-medium text-gray-700">Title<span class="text-red-500">*</span></label>
            <input v-model="title" type="text"
                class="block p-2 w-full rounded-md cursor-auto border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <!-- Deadline -->
        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Deadline<span class="text-red-500">*</span></label>
            <input v-model="deadline" type="date" @input="checkDeadline"
                class="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <p v-if="errorMessage" class="italic text-red-500">{{ errorMessage }}</p>
        </div>




        <!-- Status -->
        <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">Status<span class="text-red-500">*</span></label>
            <select v-model="status" class="border-2 rounded-md p-2 w-full cursor-not-allowed bg-gray-200" disabled>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
        </div>

        <!-- Description -->
        <div class="mb-5">
            <label class="block mb-2 text-sm font-medium text-gray-700">Description<span
                    class="text-red-500">*</span></label>
            <textarea v-model="description"
                class="block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
        <!-- File Upload -->
        <!-- <div class="mb-5">
            <label class="block text-sm mb-2 font-medium text-gray-700">Upload File</label>
            <input type="file" @change="handleFileUpload"
                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
                accept="application/pdf" multiple />
        </div> -->

        <!-- hfđhsj -->
        <label for="pdffiles" class="drop-container bg-blend-overlay" id="dropcontainer">
            <span class="drop-title">Drop files here</span>
            or
            <input type="file" id="pdffiles" @change="handleFileUpload" accept="application/pdf" multiple>
        </label>


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
<style >
.drop-container {
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 20px;
    border-radius: 10px;
    border: 2px dashed #555;
    color: #444;
    cursor: pointer;
    transition: color .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
    background: #eee;
    border-color: #111;
}

.drop-container:hover .drop-title {
    color: #222;
}

.drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color .2s ease-in-out;
}
</style>
 
<script>
import axios from 'axios';
import SideBar from '../../listView/SideBar.vue'
import { useAuthStore } from '../../../stores/auth'
import { notify } from '@kyvg/vue3-notification'

export default {
    setup() {
        const auth = useAuthStore()
        const jwt = auth.getBearerToken()

        return {
            auth, jwt
        }

    },
    data() {
        return {
            title: "title1",
            deadline: "2023-12-21",
            status: "Open",
            description: "",
            file: [],
            errorMessage: "",
        };
    },
    methods: {
        checkDeadline() {
            const currentDate = new Date();
            const selectedDate = new Date(this.deadline);
            if (selectedDate < currentDate) {
                this.deadline = "";
                this.errorMessage = "Deadline must be greater than the current date!";
            }
            else {
                this.errorMessage = ""; // Reset thông báo lỗi khi không có lỗi
            }
        },
        handleFileUpload(event) {
            this.files = event.target.files; // Get an array of selected files
            if (this.files.length > 0) {
                // Process each file here
                for (const file of this.files) {
                    console.log("Selected file:", file.name);
                }
            }
        },
        async submitForm() {
            if (this.title && this.deadline && this.status && this.description) {
                try {

                    let requestTask = {
                        title: this.title,
                        deadline: this.deadline,
                        status: this.status,
                        description: this.description,
                    };
                    // 1: Post task
                    const responseTask = await axios.post("http://54.196.242.13/task", requestTask, {
                        headers: {
                            Authorization: this.jwt
                        },
                    });
                    let id = responseTask.data.ID;
                    // 2: Post attachment if it has file
                    if (this.files && this.files.length > 0) {
                        for (const file of this.files) {
                            // Create a FormData object to send files
                            let formData = new FormData();
                            formData.append("data", file);
                            // Upload the file to S3 and get the URL
                            const uploadResponse = await axios.post("http://54.196.242.13/auth/upload", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: this.jwt,
                                },
                            });
                            let url = uploadResponse.data.response.Location;
                            let attachmentData = {
                                name: file.name,
                                path: url,
                                type: "pdf",
                                size: 1,
                            };
                            try {
                                // Post attachment
                                const postattachmentResponse = await axios.post("http://54.196.242.13/task/" + id + "/attachment", attachmentData, {
                                    headers: {
                                        Authorization: this.jwt
                                    },
                                });
                                console.log(postattachmentResponse);
                            }
                            catch (error) {
                                console.error("Error:", error);
                            }
                        }
                    }
                    
                notify({
                    title: 'Success',
                    text: 'Create request successfully',
                    type: 'success'
                })
                    try {
                        if (responseTask)
                            this.$router.push({ name: "itemDetail", params: { id: responseTask.data.ID } });
                    }
                    catch (error) {
                        console.log("error:", error);
                    }
                }
                catch (error) {
                    console.error("Error:", error);
                }
            }
            else {
               notify({
                    title: 'Error',
                    text: 'Please fill in all required fields',
                    type: 'error'
                })
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
    components: {  SideBar }
};
</script>