<template>
    <div class="bg-white shadow-md rounded-lg p-4 mb-4 w-10/12 mx-auto flex  items-center">
        <div class="flex items-center w-4/5">
            <!-- Checkbox -->
            <input type="checkbox" class="mr-4" />

            <!-- Avatar -->
            <img :src="profilePicture" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />

            <!-- Title, Sender, Time -->
            <div class="ml-4">
                <h2 class="text-lg font-semibold">{{ title }}</h2>
                <div class="text-gray-600 flex">
                    <span class="text-gray-500 text-sm ml-2">{{ sender }}</span>

                    <span class="text-gray-500 text-sm ml-2"> Time: {{ time }}</span>
                </div>
            </div>
        </div>

        <div class="text-left  w-1/5">
            <!-- Trạng thái -->

            <p class="text-gray-500 text-sm">Status: <span class="text-green"> {{ status }}</span> </p>


        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: Number,
        title: String,
        sender: String,
        time: String,
        profilePicture: String,
        status: String,
        
    },
};
</script>