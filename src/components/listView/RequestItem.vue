<template>
    <div class="bg-white shadow-md rounded-lg p-4 mb-4 w-10/12 mx-auto flex  items-center">
        <div class="flex items-center w-4/5">
            <!-- Checkbox -->
            <input type="checkbox" class="mr-4" />

            <!-- Avatar -->
            <img :src="avatar"
                alt="Avatar" class="w-12 h-12 rounded-lg object-cover" />

            <!-- Title, Sender, Time -->
            <div class="ml-4">
                <h2 class="text-lg font-semibold">{{ title }}</h2>
                <div class="text-gray-600 flex">
                    <span class="text-gray-500 text-sm ml-2">{{ sender }}</span>

                    <span class="text-gray-500 text-sm ml-2"> .Time: {{ time }}</span>
                </div>
            </div>
        </div>

        <div class="text-right">
            <!-- Trạng thái -->
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-1" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <p class="text-green-500 font-semibold">{{ status }}</p>
            </div>

            <!-- Người duyệt -->
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" class="mr-3 " viewBox="0 0 448 512">
                    <!--         <style>svg{fill:#82838c}</style> -->
                    <path
                        d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                </svg>
                <p class="text-gray-500 text-sm"> by: {{ approver }}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        sender: String,
        time: String,
        avatar: String,
        status: String,
        approver: String,
    },
};
</script>