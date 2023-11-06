<template>
    <div class="container mx-auto p-6 w-4/5 ">
        <h1 class="text-2xl font-semibold mb-4">Tạo Mới Yêu Cầu Hỗ Trợ</h1>

        <!-- Contact -->
        <div class="mb-4 ">
            <label class="block text-sm font-medium text-gray-700 ">Contact<span class="text-red-500">*</span></label>
            <input v-model="contact" type="text" class="border rounded-md p-2 w-full border-2" />
        </div>

        <!-- Subject -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Subject<span class="text-red-500">*</span></label>
            <input v-model="subject" type="text" class="border border-2 rounded-md p-2 w-full" />
        </div>

        <!-- Type -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Type:</label>
            <select v-model="type" class="border-2 rounded-md p-2 w-full">
                <option value="Question">Question</option>
                <option value="Issue">Issue</option>
                <option value="Feedback">Feedback</option>
            </select>
        </div>

        <!-- Status -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Status<span class="text-red-500">*</span></label>
            <select v-model="status" class="border-2 rounded-md p-2 w-full">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
            </select>
        </div>

        <!-- Priority -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Priority<span class="text-red-500">*</span></label>
            <select v-model="priority" class="border-2 rounded-md p-2 w-full">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
        </div>

        <!-- message -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Message<span class="text-red-500">*</span></label>
            <textarea v-model="message" class="border-2 rounded-md p-2 w-full h-32"></textarea>
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
            contact: "abc",
            subject: "abc",
            type: "Question",
            status: "Open",
            priority: "Low",
            message: "abc",

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
            if (this.contact && this.subject && this.status && this.priority && this.message) {
                // Xử lý khi tất cả trường thông tin được điền đầy đủ
                console.log("Form submitted");
                alert("submitted!");
                let request = {
                    contact: this.contact,
                    subject: this.subject,
                    type: this.type,
                    status: this.status,
                    priority: this.priority,
                    message: this.message,



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
            this.contact = "";
            this.subject = "";
            this.type = "Question";
            this.status = "Open";
            this.priority = "Low";
            this.message = "";

        },
       
    },
};
</script>
  