<template>
  <div>
    <div class="info flex">
      <!--avatar-->
      <img :src="selectedItem.profilePicture" alt="" class="h-12 w-12 rounded-full mr-2">
      <div>
        <div>
          <h2 class="text-lg font-semibold">{{ selectedItem.postedBy }}</h2>

        </div>
      </div>
    </div>
    <!-- message -->
    <div class="mt-10 h-auto mb-2">
      {{ selectedItem.description }}
    </div>
    <!--Attachments-->
    <div>
      <ul>
        <li class="flex items-center justify-between py-4  pr-20 text-sm leading-6" v-for="attachment in attachments">
          <div class="flex w-0 flex-1 items-center">
            <svg class="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                clip-rule="evenodd" />
            </svg>
            <div class="ml-4 flex min-w-0 flex-1 gap-2">
              <span class="truncate font-medium">{{ attachment.name }}</span>
              <span class="flex-shrink-0 text-gray-400">{{ attachment.size }}</span>
            </div>
          </div>
          <div class="ml-4 flex-shrink-0">
            <a :href="attachment.path" class="font-medium text-blue-600 hover:text-blue-500" target="_blank">
             <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                <path fill-rule="evenodd"
                  d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                  clip-rule="evenodd" />
              </svg>
             </div>
            </a>

          </div>


        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    selectedItem: Object,
    attachments: Array,
  },

}
</script>