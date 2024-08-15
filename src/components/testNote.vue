<template>

  <!-- 測試----------------------------------------------------------------------------------- -->
  <!-- 最外層：(section, sectionIndex) in scoreHiHat -->
  <!-- 第二層：(beat, beatIndex) in section" :key="beatIndex -->
  <!-- 最內層：(HiHat, HiHatIndex) in beat" -->
   <v-container>
    <v-row class="scoreArea h-100">
      <template v-for="(section, sectionIndex) in scoreHiHat" :key="sectionIndex">
        <v-col cols="10" lg="5" class="section">
          <div class="sectionTitle">第{{sectionIndex+1}}小節</div>
          <div class="allBeats d-flex">
          <!-- 一拍------------------------------------------------------------ -->
          <div class="beat w-100 bg-info" v-for="(beat, beatIndex) in section" :key="beatIndex">
            <div class="beat-title border">第 {{beatIndex + 1}} 拍</div>
            <div class="">
              <!-- SVG放這裡 ------------------------------------------------------------------------->
              <svg :id="`s${ sectionIndex+1 }-b${ beatIndex+1 }`" class="note" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              width="668px" height="398px" viewBox="0 0 668 398" enable-background="new 0 0 668 398" xml:space="preserve">
                <!-- 鼓點--------------------------------------------------------------------------- -->
                <!-- 大鼓點-->
                <g class="kicks">
                  <path class="kick-1" :class="{active:scoreKick[sectionIndex][beatIndex][0]}" fill="#231815" d="M138.315,267.345v72.005c-0.251-1.792-0.688-3.569-1.343-5.31
                    c-5.851-15.537-26.061-22.309-45.139-15.125c-19.079,7.186-29.801,25.605-23.951,41.141c5.851,15.539,26.061,22.311,45.139,15.127
                    c14.13-5.322,23.669-16.808,25.293-28.719v28.529h7V267.345H138.315z"/>
                  <path class="kick-2" :class="{active:scoreKick[sectionIndex][beatIndex][1]}" fill="#231815" d="M286.884,267.345v72.009c-0.251-1.794-0.688-3.572-1.343-5.313
                    c-5.851-15.537-26.061-22.309-45.139-15.125c-19.079,7.186-29.801,25.605-23.95,41.141c5.851,15.539,26.061,22.311,45.139,15.127
                    c14.132-5.322,23.67-16.809,25.293-28.722v28.532h7V267.345H286.884z"/>
                  <path class="kick-3" :class="{active:scoreKick[sectionIndex][beatIndex][2]}" fill="#231815" d="M435.48,267.345v72.012c-0.251-1.795-0.688-3.574-1.344-5.316
                    c-5.851-15.537-26.06-22.309-45.144-15.125c-19.078,7.186-29.817,25.605-23.956,41.141c5.856,15.539,26.07,22.311,45.151,15.127
                    c14.132-5.323,23.67-16.811,25.292-28.725v28.535h7V267.345H435.48z"/>
                  <path class="kick-4" :class="{active:scoreKick[sectionIndex][beatIndex][3]}" fill="#231815" d="M584.063,267.345v69.173c-0.218-0.832-0.47-1.659-0.777-2.478
                    c-5.851-15.537-26.061-22.309-45.139-15.125c-19.078,7.186-29.801,25.605-23.95,41.141c5.851,15.539,26.062,22.311,45.14,15.127
                    c12.957-4.88,22.052-14.943,24.727-25.765v25.575h7V267.345H584.063z"/>
                </g>
                <!-- 小鼓點 -->
                <g class="snares">
                  <path class="snare-1" :class="{active:scoreSnare[sectionIndex][beatIndex][0]}" d="M136.972,226.676c5.852,15.536-4.872,33.956-23.95,41.142c-19.078,7.184-39.288,0.412-45.139-15.127
                    c-5.851-15.535,4.872-33.955,23.951-41.14C110.912,204.367,131.121,211.139,136.972,226.676z"/>
                  <path class="snare-2" :class="{active:scoreSnare[sectionIndex][beatIndex][1]}" d="M285.541,226.676c5.852,15.536-4.871,33.956-23.95,41.142c-19.078,7.184-39.288,0.412-45.139-15.127
                    c-5.851-15.535,4.871-33.955,23.95-41.14C259.48,204.367,279.69,211.139,285.541,226.676z"/>
                  <path class="snare-3" :class="{active:scoreSnare[sectionIndex][beatIndex][2]}" d="M434.137,226.676c5.852,15.536-4.871,33.956-23.948,41.142c-19.081,7.184-39.295,0.412-45.151-15.127
                    c-5.861-15.535,4.878-33.955,23.956-41.14C408.077,204.367,428.286,211.139,434.137,226.676z"/>
                  <path class="snare-4" :class="{active:scoreSnare[sectionIndex][beatIndex][3]}" d="M582.719,226.676c5.852,15.536-4.871,33.956-23.949,41.142c-19.078,7.184-39.289,0.412-45.14-15.127
                    c-5.851-15.535,4.872-33.955,23.95-41.14S576.868,211.139,582.719,226.676z"/>
                </g>
                <!-- hihat點 -->
                <g class="hiHats">
                  <path class="hihat-1" :class="{active:scoreHiHat[sectionIndex][beatIndex][0]}" d="M140.503,186.84l-12.207,10.645c-6.186-6.966-15.593-17.251-28.223-30.859
                    c-7.358,8.398-15.17,18.686-23.438,30.859l-13.965-7.715c8.789-12.891,17.544-24.219,26.27-33.984
                    c-5.273-5.013-13.249-11.685-23.926-20.02l10.547-12.207c7.031,5.078,15.169,11.914,24.414,20.508
                    c4.622-4.102,10.091-8.169,16.406-12.207c6.445-4.102,11.328-6.607,14.648-7.52l8.105,14.063
                    c-7.944,2.409-17.285,8.042-28.027,16.895c3.384,3.386,8.301,8.627,14.746,15.723C132.235,178.182,137.118,183.456,140.503,186.84z"
                    />
                  <path class="hihat-2" :class="{active:scoreHiHat[sectionIndex][beatIndex][1]}" d="M289.086,186.84l-12.207,10.645c-6.186-6.966-15.593-17.251-28.223-30.859
                    c-7.358,8.398-15.17,18.686-23.438,30.859l-13.965-7.715c8.789-12.891,17.544-24.219,26.27-33.984
                    c-5.273-5.013-13.249-11.685-23.926-20.02l10.547-12.207c7.031,5.078,15.169,11.914,24.414,20.508
                    c4.622-4.102,10.091-8.169,16.406-12.207c6.445-4.102,11.328-6.607,14.648-7.52l8.105,14.063
                    c-7.944,2.409-17.285,8.042-28.027,16.895c3.384,3.386,8.301,8.627,14.746,15.723C280.817,178.182,285.7,183.456,289.086,186.84z"
                    />
                  <path class="hihat-3" :class="{active:scoreHiHat[sectionIndex][beatIndex][2]}" d="M437.647,186.84l-12.207,10.645c-6.187-6.966-15.594-17.251-28.223-30.859
                    c-7.358,8.398-15.171,18.686-23.438,30.859l-13.965-7.715c8.789-12.891,17.544-24.219,26.27-33.984
                    c-5.273-5.013-13.25-11.685-23.926-20.02l10.547-12.207c7.031,5.078,15.168,11.914,24.414,20.508
                    c4.621-4.102,10.09-8.169,16.406-12.207c6.445-4.102,11.328-6.607,14.648-7.52l8.105,14.063
                    c-7.944,2.409-17.285,8.042-28.027,16.895c3.384,3.386,8.301,8.627,14.746,15.723C429.378,178.182,434.261,183.456,437.647,186.84z"
                    />
                  <path class="hihat-4" :class="{active:scoreHiHat[sectionIndex][beatIndex][3]}" d="M586.23,186.84l-12.207,10.645c-6.187-6.966-15.593-17.251-28.223-30.859
                    c-7.358,8.398-15.171,18.686-23.438,30.859l-13.965-7.715c8.789-12.891,17.544-24.219,26.27-33.984
                    c-5.273-5.013-13.249-11.685-23.926-20.02l10.547-12.207c7.031,5.078,15.169,11.914,24.414,20.508
                    c4.622-4.102,10.091-8.169,16.406-12.207c6.445-4.102,11.328-6.607,14.648-7.52l8.105,14.063
                    c-7.944,2.409-17.285,8.042-28.027,16.895c3.384,3.386,8.301,8.627,14.746,15.723C577.962,178.182,582.845,183.456,586.23,186.84z"
                    />
                </g>
                <!-- 直線X-1：接hiHat的線--------------------------------------------------------------------- -->
                <!-- 1. 上方HiHat點為true就一定會顯示 -->
                <!-- 2. 或是小鼓點有也會顯示 -->
                <!-- 3. 或是大鼓點有也會顯示 -->
                <g class="line-X-1">
                  <rect class="line-1-1" :class="{active:(scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])}" x="138.315" y="21.492" fill="#231815" width="7" height="141.611"/>
                  <rect class="line-2-1" :class="{active:(scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])}" x="286.884" y="21.492" fill="#231815" width="7" height="141.611"/>
                  <rect class="line-3-1" :class="{active:(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])}" x="435.503" y="21.492" fill="#231815" width="7" height="141.611"/>
                  <rect class="line-4-1" :class="{active:(scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])}" x="584.063" y="21.492" fill="#231815" width="7" height="141.611"/>
                </g>
                <!-- 直線X-2：hiHat～小鼓之間的線-------------------------------------------------------------- -->
                <!-- 1. 上方小鼓點為true就一定會顯示 -->
                <!-- 2. 或是大鼓點有也會顯示-->
                <g class="line-X-2">
                  <rect class="line-1-2" :class="{active:(scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])}" x="138.315" y="162.819" fill="#231815" width="7" height="104.81"/>
                  <rect class="line-2-2" :class="{active:(scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])}" x="286.884" y="162.819" fill="#231815" width="7" height="104.81"/>
                  <rect class="line-3-2" :class="{active:(scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])}" x="435.48" y="162.819" fill="#231815" width="7" height="104.81"/>
                  <rect class="line-4-2" :class="{active:(scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])}" x="584.063" y="162.819" fill="#231815" width="7" height="104.81"/>
                </g>
                <!-- 最上方的橫線----------------------------------------------------------------------------- -->
                <g class="horizontal-lines">
                  <!-- 1. 當 (line-1-1 顯示) && (line-2-1或line-3-1或line-4-1顯示)時顯示 ****條件同上方的line-X-1****-->
                  <polygon class="horizontal-line-12"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      (
                        ((scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1]))||
                        ((scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2]))||
                        ((scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3]))
                      )
                    )}"
                    fill="#231815" points="216.153,21.461 145.347,21.461 145.347,36.461 216.153,36.461
                    286.959,36.461 286.959,21.461 "/>
                  <!-- 2. 當 (line-1-1 或 line-2-1 顯示) && (line-3-1或line-4-1顯示)時顯示示 -->
                  <polygon class="horizontal-line-23"
                    :class="{active:(
                        (
                          (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])||
                          ((scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1]))
                        )&&
                        (
                          ((scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2]))||
                          ((scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3]))
                        )
                      )}"
                    fill="#231815" points="364.69,21.461 293.884,21.461 293.884,36.461 364.69,36.461
                    435.502,36.461 435.502,21.461 "/>
                  <!-- 3. 當 (line-4-1顯示) && (line-1-1 或 line-2-1 或line-3- 顯示)時顯示-->
                  <polygon class="horizontal-line-34"
                  :class="{active:(
                    (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])&&
                    (
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])||
                      (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])||
                      ((scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2]))
                    )
                  )}"
                    fill="#231815" points="513.165,21.461 442.358,21.461 442.358,36.461 513.165,36.461
                    583.972,36.461 583.972,21.461 "/>
                </g>

                <!-- 八分/十六分音符----------------------------------------------------------------------------------------------- -->
                <g class="eighths">
                  <!-- 1. 只有(line-2-1顯示)且其他line-X-1沒有顯示時顯示 -->
                  <path class="eighth-2"
                  :class="{active:
                      (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      !(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                      !(scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      }"
                  fill="#231815" d="M291.969,21.308c0,0,0.492,0.081,1.356,0.342c0.426,0.147,0.953,0.326,1.558,0.571
                  c0.59,0.274,1.277,0.574,2.016,0.969c0.729,0.413,1.533,0.874,2.385,1.414c0.843,0.555,1.732,1.188,2.66,1.889
                  c1.838,1.428,3.914,3.018,6.027,4.94c2.106,1.925,4.232,4.2,6.144,6.866c1.912,2.661,3.6,5.722,4.804,9.098
                  c1.205,3.372,1.933,7.048,2.044,10.804c0.12,3.757-0.345,7.568-1.208,11.268c-0.241,0.919-0.421,1.856-0.714,2.759l-0.871,2.706
                  c-0.629,1.774-1.366,3.532-2.049,5.237c-1.469,3.421-2.663,6.825-3.604,10.212c-0.919,3.378-1.509,6.746-1.434,9.931
                  c0.084,3.16,0.843,6.189,2.561,8.314c1.654,2.171,4.018,3.333,6.149,3.913c2.151,0.609,4.142,0.676,5.753,0.669
                  c1.619-0.024,2.888-0.181,3.744-0.313c0.856-0.133,1.292-0.239,1.292-0.239l0.229,0.974c0,0-0.469,0.166-1.349,0.4
                  c-0.881,0.232-2.183,0.537-3.897,0.742c-1.711,0.183-3.847,0.344-6.369-0.104c-1.261-0.198-2.614-0.605-3.996-1.253
                  c-1.393-0.629-2.77-1.635-3.971-2.925c-2.486-2.604-3.751-6.381-4.188-10.089c-0.434-3.752-0.123-7.565,0.505-11.348
                  c0.124-0.971,0.356-1.881,0.537-2.84c0.097-0.476,0.195-0.953,0.293-1.432l0.364-1.442c0.247-0.949,0.496-1.98,0.754-2.888
                  c0.257-0.888,0.516-1.78,0.776-2.676l0.195-0.673l0.049-0.168l0.012-0.042c-0.006,0.009,0.094-0.232,0.056-0.148l0.021-0.078
                  l0.081-0.309l0.325-1.234c0.2-0.824,0.472-1.636,0.617-2.463l0.473-2.462c0.162-0.816,0.204-1.635,0.315-2.443
                  c0.337-3.235,0.291-6.375-0.2-9.247c-0.485-2.876-1.425-5.468-2.643-7.756c-2.44-4.577-6.098-7.974-9.703-10.439
                  c-0.923-0.592-1.759-1.222-2.721-1.614c-0.963-0.391-2.069-0.472-3.022-0.627c-0.979-0.117-1.767-0.382-2.356-0.869
                  c-0.577-0.507-0.981-1.203-1.271-2.013c-0.654-1.455-0.273-4.572,0.166-7.469c0.127-0.779,0.239-1.468,0.336-2.062
                  c0.125-0.692,0.231-1.275,0.316-1.744c0.101-0.52,0.19-0.966,0.231-1.244c0.046-0.284,0.07-0.429,0.07-0.429L291.969,21.308z"/>
                  <!-- 2. 只有(line-3-1顯示)且其他line-X-1沒有顯示時顯示-->
                  <path class="eighth-3"
                    :class="{active:
                      (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                      !(scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      !(scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      }"
                    fill="#231815" d="M440.587,21.308c0,0,0.492,0.081,1.356,0.342c0.427,0.147,0.953,0.326,1.558,0.571c0.591,0.274,1.277,0.574,2.017,0.969c0.729,0.413,1.533,0.874,2.385,1.414c0.843,0.555,1.731,1.188,2.659,1.889
                    c1.838,1.428,3.914,3.018,6.027,4.94c2.106,1.925,4.232,4.2,6.145,6.866c1.911,2.661,3.6,5.722,4.804,9.098
                    c1.205,3.372,1.933,7.048,2.044,10.804c0.119,3.757-0.345,7.568-1.208,11.268c-0.241,0.919-0.421,1.856-0.714,2.759l-0.871,2.706
                    c-0.629,1.774-1.365,3.532-2.049,5.237c-1.469,3.421-2.663,6.825-3.604,10.212c-0.919,3.378-1.509,6.746-1.435,9.931
                    c0.084,3.16,0.844,6.189,2.561,8.314c1.654,2.171,4.019,3.333,6.149,3.913c2.151,0.609,4.142,0.676,5.753,0.669
                    c1.619-0.024,2.889-0.181,3.744-0.313c0.855-0.133,1.291-0.239,1.291-0.239l0.229,0.974c0,0-0.469,0.166-1.349,0.4
                    c-0.881,0.232-2.183,0.537-3.897,0.742c-1.711,0.183-3.846,0.344-6.368-0.104c-1.261-0.198-2.614-0.605-3.996-1.253
                    c-1.393-0.629-2.771-1.635-3.971-2.925c-2.485-2.604-3.751-6.381-4.188-10.089c-0.434-3.752-0.122-7.565,0.506-11.348
                    c0.123-0.971,0.355-1.881,0.536-2.84c0.097-0.476,0.194-0.953,0.293-1.432l0.364-1.442c0.246-0.949,0.496-1.98,0.754-2.888
                    c0.257-0.888,0.516-1.78,0.775-2.676l0.195-0.673l0.049-0.168l0.012-0.042c-0.006,0.009,0.094-0.232,0.057-0.148l0.02-0.078
                    l0.082-0.309l0.324-1.234c0.201-0.824,0.473-1.636,0.617-2.463l0.473-2.462c0.162-0.816,0.204-1.635,0.315-2.443
                    c0.337-3.235,0.291-6.375-0.2-9.247c-0.484-2.876-1.425-5.468-2.643-7.756c-2.44-4.577-6.098-7.974-9.703-10.439
                    c-0.924-0.592-1.76-1.222-2.721-1.614c-0.963-0.391-2.068-0.472-3.022-0.627c-0.979-0.117-1.767-0.382-2.356-0.869
                    c-0.576-0.507-0.98-1.203-1.271-2.013c-0.654-1.455-0.273-4.572,0.166-7.469c0.127-0.779,0.24-1.468,0.337-2.062
                    c0.126-0.692,0.231-1.275,0.315-1.744c0.102-0.52,0.19-0.966,0.231-1.244c0.046-0.284,0.069-0.429,0.069-0.429L440.587,21.308z"/>
                </g>
                <!-- 3. 只有(line-4-1顯示)且其他line-X-1沒有顯示時顯示 -->
                <g class="sixteenth-4s">
                  <path class="sixteenth-4"
                    :class="{active:
                      (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])&&
                      !(scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      !(scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])
                    }"
                    fill="#231815" d="M589.348,21.105c0.001,0,2.383,1.934,5.659,5.136c3.273,3.198,7.463,7.679,10.968,12.713
                  c0.884,1.251,1.702,2.55,2.477,3.847c0.755,1.31,1.455,2.625,2.05,3.942c0.589,1.318,1.112,2.619,1.486,3.896
                  c0.206,0.633,0.376,1.257,0.501,1.874c0.068,0.306,0.136,0.607,0.202,0.902c0.044,0.301,0.088,0.595,0.13,0.884
                  c0.042,0.289,0.083,0.572,0.122,0.848c0.017,0.28,0.032,0.553,0.048,0.819c0.034,0.533,0.066,1.038,0.028,1.515
                  c-0.027,0.476-0.018,0.924-0.074,1.334c-0.06,0.41-0.115,0.786-0.165,1.125c-0.086,0.682-0.288,1.192-0.363,1.552
                  c-0.095,0.356-0.146,0.546-0.146,0.546l-0.949-0.312c0,0-0.022-0.197-0.064-0.567c-0.054-0.367-0.029-0.872-0.177-1.521
                  c-0.073-0.323-0.123-0.669-0.184-1.037c-0.063-0.369-0.201-0.77-0.308-1.181c-0.091-0.41-0.283-0.842-0.425-1.289
                  c-0.073-0.22-0.148-0.446-0.226-0.678c-0.099-0.228-0.2-0.461-0.304-0.699c-0.102-0.233-0.205-0.471-0.311-0.713
                  c-0.126-0.238-0.254-0.48-0.385-0.727c-0.136-0.243-0.249-0.492-0.374-0.742c-0.142-0.248-0.286-0.499-0.432-0.754
                  c-0.579-1.007-1.232-2.057-1.969-3.105c-0.707-1.064-1.536-2.118-2.35-3.202c-0.865-1.062-1.717-2.152-2.639-3.213
                  c-0.915-1.057-1.823-2.136-2.773-3.155c-0.928-1.037-1.854-2.058-2.78-3.021c-0.914-0.978-1.794-1.929-2.665-2.803
                  c-0.443-0.429-0.823-0.896-1.216-1.326c-0.34-0.481-0.7-0.917-0.973-1.414c-1.172-1.895-1.704-4.004-1.938-5.695
                  c-0.107-0.855-0.128-1.615-0.14-2.143c0.002-0.538,0.023-0.865,0.023-0.864L589.348,21.105z"/>
                  <path class="sixteenth-4"
                    :class="{active:
                      (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])&&
                      !(scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      !(scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])
                    }"
                    fill="#231815" d="M587.879,44.844c0.001,0,2.383,1.934,5.659,5.136c3.273,3.198,7.463,7.679,10.968,12.713
                  c0.884,1.251,1.702,2.55,2.477,3.847c0.755,1.31,1.455,2.625,2.05,3.942c0.589,1.318,1.112,2.619,1.486,3.896
                  c0.206,0.633,0.376,1.257,0.501,1.874c0.068,0.306,0.136,0.607,0.202,0.902c0.044,0.301,0.088,0.595,0.13,0.884
                  c0.042,0.289,0.083,0.572,0.122,0.848c0.017,0.28,0.032,0.553,0.048,0.819c0.034,0.533,0.066,1.038,0.028,1.515
                  c-0.027,0.476-0.018,0.924-0.074,1.334c-0.06,0.41-0.115,0.786-0.165,1.125c-0.086,0.682-0.288,1.192-0.363,1.552
                  c-0.095,0.356-0.146,0.546-0.146,0.546l-0.949-0.312c0,0-0.022-0.197-0.064-0.567c-0.054-0.367-0.029-0.872-0.177-1.521
                  c-0.073-0.323-0.123-0.669-0.184-1.037c-0.063-0.369-0.201-0.77-0.308-1.181c-0.091-0.41-0.283-0.842-0.425-1.289
                  c-0.073-0.22-0.148-0.446-0.226-0.678c-0.099-0.228-0.2-0.461-0.304-0.699c-0.102-0.233-0.205-0.471-0.311-0.713
                  c-0.126-0.238-0.254-0.48-0.385-0.727c-0.136-0.243-0.249-0.492-0.374-0.742c-0.142-0.248-0.286-0.499-0.432-0.754
                  c-0.579-1.007-1.232-2.057-1.969-3.105c-0.707-1.064-1.536-2.118-2.35-3.202c-0.865-1.062-1.717-2.152-2.639-3.213
                  c-0.915-1.057-1.823-2.136-2.773-3.155c-0.928-1.037-1.854-2.058-2.78-3.021c-0.914-0.978-1.794-1.929-2.665-2.803
                  c-0.443-0.429-0.823-0.896-1.216-1.326c-0.34-0.481-0.7-0.917-0.973-1.414c-1.172-1.895-1.704-4.004-1.938-5.695
                  c-0.107-0.855-0.128-1.615-0.14-2.143c0.002-0.538,0.023-0.865,0.023-0.864L587.879,44.844z"/>
                </g>
                <!-- 附點音符-------------------------------------------- -->
                <!-- 只有(line1-1 && line4-1顯示) 且 (XXX-1顯示)時才會顯示-->
                <g class="dots-1">
                  <circle class="dot-hihat-1"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )&& (scoreHiHat[sectionIndex][beatIndex][0])
                    }"
                   fill="#231815" cx="157.254" cy="157.075" r="7.719"/>
                   <circle class="dot-snare-1"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )&& (scoreSnare[sectionIndex][beatIndex][0])
                    }"
                  fill="#231815" cx="157.254" cy="233.656" r="7.719"/>
                  <circle class="dot-kick-1"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )&& (scoreKick[sectionIndex][beatIndex][0])
                    }"
                    fill="#231815" cx="157.253" cy="347.048" r="7.719"/>
                </g>
                <!-- (line2-1顯示 且 line3-1、line4-1不顯示)且 (XXX-2顯示)時才會顯示--->
                <g class="dots-2">
                  <circle class="dot-hihat-2"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                      !(scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )&& (scoreHiHat[sectionIndex][beatIndex][1])
                    }" fill="#231815" cx="307.553" cy="157.075" r="7.719"/>
                  <circle class="dot-snare-2"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                      !(scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )&& (scoreSnare[sectionIndex][beatIndex][1])
                    }"  fill="#231815" cx="307.552" cy="233.656" r="7.719"/>
                  <circle class="dot-kick-2"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                      !(scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                      !(scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )&& (scoreKick[sectionIndex][beatIndex][1])
                    }"  fill="#231815" cx="307.552" cy="347.048" r="7.719"/>
                </g>
                <!-- 短橫線---------------------------------------------- -->
                <!-- line1-1、line2-1、line3-1、line4-1都顯示時，六條都顯示-->
                <g class="short-horizontal-lines">
                  <!-- 1. line1-1、line2-1、line3-1、line4-1都顯示時顯示-->
                  <!-- 2. 當(line1-1和line2-1都顯示)時顯示 -->
                  <!-- 得到 => 只要line1-1和line2-1都顯示時就會顯示這條 -->
                  <rect class="short-horizontal-line-12-1"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      ((scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1]))
                    )}" x="145.347" y="48.723" fill="#231815" width="70.806" height="15"/>
                  <!-- short-horizontal-line-12-1 顯示 -->
                  <!-- 且 line3-1顯示或(line3-1且line4-1顯示)時顯示 -->
                  <rect class="short-horizontal-line-12-2"
                    :class="{active:(
                      (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                      ((scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1]))
                    )&&(
                      (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])||
                      (
                        (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                        (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )
                    )}"
                    x="216.153" y="48.723" fill="#231815" width="70.806" height="15"/>
                  <!-- 1. line1-1、line2-1、line3-1、line4-1都顯示時顯示-->
                  <!-- 2. ((line2-1 && line3-1顯示)&& line1-1不顯示)時顯示 ****此時的line4-1是否顯示不會影響****-->
                  <rect class="short-horizontal-line-23-1"
                    :class="{active:(
                        (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])&&
                        (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                        (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                        (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )||(
                        (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                        (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                        !(scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])
                      )
                    }" x="293.884" y="48.723" fill="#231815" width="70.807" height="15"/>
                  <!-- 1. line1-1、line2-1、line3-1、line4-1都顯示時顯示 -->
                  <!-- 2. line2-1、line3-1、line4-1都顯示時顯示 -->
                  <!-- 得到 =>line2-1、line3-1、line4-1顯示時就會顯示，line1-1不影響 -->
                  <rect class="short-horizontal-line-23-2"
                    :class="{active:(
                        (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])&&
                        (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                        (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )}" x="364.69" y="48.723" fill="#231815" width="70.812" height="15"/>
                  <!-- 1. line1-1、line2-1、line3-1、line4-1都顯示時顯示 -->
                  <!-- 2. line3-1、line4-1都顯示時顯示，且line1-1、line2-1不影響 -->
                  <!-- 得到 => 只要line3-1、line4-1都顯示時就會顯示 -->
                  <rect class="short-horizontal-line-34-1"
                  :class="{active:(
                        (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])&&
                        (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                      )}" x="442.358" y="48.723" fill="#231815" width="70.807" height="15"/>
                  <!-- 1. line1-1、line2-1、line3-1、line4-1都顯示時顯示 -->
                  <!-- 2. line3-1、line4-1都顯示時顯示，且line1-1、line2-1不影響 -->
                  <!-- 3. line2-1、line4-1都顯示時顯示，此時line1-1、line3-1不影響-->
                  <!-- 3. line1-1、line4-1都顯示時顯示，此時line2-1、line3-1不影響-->
                  <!-- 得到 => 只要line4-1有顯示，其餘任一條有顯示時就會顯示  -->
                  <rect class="short-horizontal-line-34-2"
                    :class="{active:
                        (scoreHiHat[sectionIndex][beatIndex][3]||scoreSnare[sectionIndex][beatIndex][3]||scoreKick[sectionIndex][beatIndex][3])
                        &&(
                        (scoreHiHat[sectionIndex][beatIndex][0]||scoreSnare[sectionIndex][beatIndex][0]||scoreKick[sectionIndex][beatIndex][0])||
                        (scoreHiHat[sectionIndex][beatIndex][1]||scoreSnare[sectionIndex][beatIndex][1]||scoreKick[sectionIndex][beatIndex][1])||
                        (scoreHiHat[sectionIndex][beatIndex][2]||scoreSnare[sectionIndex][beatIndex][2]||scoreKick[sectionIndex][beatIndex][2])
                      )}"
                   x="513.165" y="48.723" fill="#231815" width="70.807" height="15"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </v-col>
      </template>
    </v-row>
   </v-container>
</template>

<script setup>
// 外部要接收的東西
const props = defineProps(['scoreHiHat', 'scoreSnare', 'scoreKick'])
// 對props裡的值做處理，要使用props.data
</script>

<style scoped lang="scss">
.note{
  width: 200px;
  // 起始狀態全部都是fill: transparent
  path,rect,circle,polygon,g {
    fill: transparent;
  }
  .active {
      fill: red
    }
}

// 第s1小節－第b1拍
#s1-b1{
  // width: 800px;
}
</style>
