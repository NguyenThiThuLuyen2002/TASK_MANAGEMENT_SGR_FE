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
            <input v-model="deadline" type="text" class="border border-2 rounded-md p-2 w-full" />
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
            <label class="block text-sm font-medium text-gray-700">Upload File<span class="text-red-500">*</span></label>
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
                <button @click = "this.$router.push({name: 'requestList'})" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4">
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
export default {
    data() {
        return {
            subject: "abc",
            status: "Open",
            description: "abc",

        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0]; // Lấy tệp được chọn

            if (file) {
                // Xử lý tệp ở đây, ví dụ: tải lên máy chủ, hiển thị tên tệp, v.v.
                console.log("Selected file:", file.name);

                // Bạn có thể gửi tệp này lên máy chủ hoặc thực hiện xử lý khác theo nhu cầu của bạn.
            }
        },
        submitForm() {
            if (this.title && this.deadline && this.status && this.description ) {
                // Xử lý khi tất cả trường thông tin được điền đầy đủ
                console.log("Form submitted");
                alert("submitted!");
                let request = {
                    title: this.title,
                    deadline: this.deadline,
                    status: this.status,
                    description: this.description,



                };

                console.log(request)
                // axios.post("api", request)
                //     .then(response => {
                //         console.log('Response:', response.data);
                //         this.$router.push({name: 'itemDetail', params: {id: response.data.id}})
                //     })
                //     .catch(error => {
                //         console.error('Error:', error);
                    // });
            } else {
                alert("Vui lòng điền đầy đủ thông tin bắt buộc.");

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
  